import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const { routes } = await server.ssrLoadModule(
    "/src/data/content.js",
  );
  const { SITE_URL, canonicalUrl, getSeo, renderSeoHead, escapeHtml: escape } =
    await server.ssrLoadModule("/src/utils/seo.js");
  const template = await readFile("dist/index.html", "utf8");
  for (const route of [...routes, "/404"]) {
    const seo = getSeo(route);
    const html = template
      .replace('id="root"', `id="root" data-route="${escape(route)}"`)
      .replace(/<title>.*?<\/title>/, `<title>${escape(seo.title)}</title>`)
      .replace(
        /<meta name="description" content="[^"]*"\s*\/>/,
        `<meta name="description" content="${escape(seo.description)}" />`,
      )
      .replace("<!-- page-meta -->", renderSeoHead(seo))
      .replace(
        "<!-- app-html -->",
        renderToString(createElement(App, { path: route })),
      );
    const output =
      route === "/404"
        ? resolve("dist/404.html")
        : route === "/"
          ? resolve("dist/index.html")
          : resolve("dist", `.${route}.html`);
    await mkdir(resolve(output, ".."), { recursive: true });
    await writeFile(output, html);
  }
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${escape(canonicalUrl(route))}</loc></url>`).join("")}</urlset>\n`,
  );
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  );
  console.log(
    `Prerendered ${routes.length} pages + 404, sitemap, and robots.txt.`,
  );
} finally {
  await server.close();
}
