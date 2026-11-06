import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const siteUrl = "https://kaxurix.vercel.app";
const escape = (text) =>
  text.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const { routes, getPage } = await server.ssrLoadModule(
    "/src/data/content.js",
  );
  const template = await readFile("dist/index.html", "utf8");
  for (const route of [...routes, "/404"]) {
    const page = getPage(route);
    const title = page.type === "home" ? page.title : `${page.title} — kaxurix`;
    const url = `${siteUrl}${route === "/" ? "" : route}`;
    const meta = `<link rel="canonical" href="${escape(url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="kaxurix" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:url" content="${escape(url)}" />
    <meta name="twitter:card" content="summary" />${page.type === "404" ? '\n    <meta name="robots" content="noindex" />' : ""}`;
    const html = template
      .replace('id="root"', `id="root" data-route="${escape(route)}"`)
      .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
      .replace(
        /<meta name="description" content="[^"]*"\s*\/>/,
        `<meta name="description" content="${escape(page.description)}" />`,
      )
      .replace("<!-- page-meta -->", meta)
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
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${siteUrl}${route === "/" ? "" : route}</loc></url>`).join("")}</urlset>\n`,
  );
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
  );
  console.log(
    `Prerendered ${routes.length} pages + 404, sitemap, and robots.txt.`,
  );
} finally {
  await server.close();
}
