import { test, expect } from "@playwright/test";
import { routes } from "../src/data/content.js";

const origin = "https://kaxurix.vercel.app";

test("Every public route serves crawlable metadata and linked structured data before JavaScript", async ({ page, request }) => {
  const descriptions = new Set();
  for (const route of routes) {
    const response = await request.get(route);
    expect(response.ok(), route).toBe(true);
    const html = await response.text();
    const head = await page.evaluate((source) => {
      const doc = new DOMParser().parseFromString(source, "text/html");
      const content = (selector) => [...doc.querySelectorAll(selector)].map((node) => node.content);
      return {
        title: doc.title,
        language: doc.documentElement.lang,
        descriptions: content('meta[name="description"]'),
        canonicals: [...doc.querySelectorAll('link[rel="canonical"]')].map((node) => node.getAttribute("href")),
        robots: content('meta[name="robots"]'),
        ogUrl: content('meta[property="og:url"]'),
        ogTitle: content('meta[property="og:title"]'),
        ogDescription: content('meta[property="og:description"]'),
        image: content('meta[property="og:image"]'),
        alt: content('meta[property="og:image:alt"]'),
        twitterCard: content('meta[name="twitter:card"]'),
        twitterImage: content('meta[name="twitter:image"]'),
        schemas: [...doc.querySelectorAll('script[type="application/ld+json"]')].map((node) => JSON.parse(node.textContent)),
        headings: doc.querySelectorAll("main h1").length,
        itemLinks: [...doc.querySelectorAll(".showcase-copy h3 a, .lab-copy h3 a")].map((node) => node.getAttribute("href")),
      };
    }, html);
    const canonical = `${origin}${route === "/" ? "" : route}`;
    expect(head.title, route).toBe("Kautsar Rifqi Aditya");
    expect(head.language).toBe("en");
    expect(head.headings, route).toBe(1);
    expect(head.descriptions).toHaveLength(1);
    expect(head.descriptions[0].length).toBeGreaterThan(30);
    expect(descriptions.has(head.descriptions[0]), `Duplicate description at ${route}`).toBe(false);
    descriptions.add(head.descriptions[0]);
    expect(head.canonicals).toEqual([canonical]);
    expect(head.robots).toEqual(["index, follow, max-image-preview:large"]);
    expect(head.ogUrl).toEqual([canonical]);
    expect(head.ogTitle[0]).toContain("Kautsar Rifqi Aditya");
    expect(head.ogDescription).toEqual(head.descriptions);
    expect(head.image).toEqual([`${origin}/og/portfolio.png`]);
    expect(head.alt[0].length).toBeGreaterThan(20);
    expect(head.twitterCard).toEqual(["summary_large_image"]);
    expect(head.twitterImage).toEqual(head.image);
    expect(head.schemas).toHaveLength(1);
    const schema = head.schemas[0];
    expect(schema["@context"]).toBe("https://schema.org");
    const graph = schema["@graph"];
    const website = graph.find((node) => node["@type"] === "WebSite");
    expect(website.name).toBe("Kautsar Rifqi Aditya");
    expect(website.alternateName).toBe("kaxurix");
    const webPage = graph.find((node) => node["@id"] === `${canonical}#webpage`);
    expect(webPage.url).toBe(canonical);
    const ids = new Set(graph.map((node) => node["@id"]));
    // Every local @id reference resolves inside this page's graph.
    const checkReferences = (node) => {
      if (!node || typeof node !== "object") return;
      if (Object.keys(node).length === 1 && node["@id"]) expect(ids.has(node["@id"])).toBe(true);
      Object.values(node).forEach(checkReferences);
    };
    checkReferences(schema);
    if (route === "/about") {
      expect(webPage["@type"]).toBe("ProfilePage");
      expect(webPage.mainEntity).toEqual({ "@id": `${origin}/#person` });
    }
    if (["/work", "/lab", "/life"].includes(route)) {
      expect(webPage["@type"]).toBe("CollectionPage");
      const list = graph.find((node) => node["@type"] === "ItemList");
      const expectedCount = route === "/work" ? 5 : route === "/lab" ? 3 : 6;
      expect(list.itemListElement).toHaveLength(expectedCount);
      expect(list.numberOfItems).toBe(expectedCount);
      for (const entry of list.itemListElement) {
        expect(routes).toContain(new URL(entry.url).pathname);
        if (route === "/work") expect(head.itemLinks).toContain(new URL(entry.url).pathname);
      }
    }
    if (route.split("/").length === 3) {
      const content = graph.find((node) => node["@type"] === "CreativeWork");
      expect(content.url).toBe(canonical);
      expect(content.image).not.toContain("undefined");
      expect((await request.get(new URL(content.image).pathname)).ok()).toBe(true);
    }
    if (route !== "/") {
      const crumbs = graph.find((node) => node["@type"] === "BreadcrumbList");
      expect(crumbs.itemListElement.at(-1).item).toBe(canonical);
    }
  }
});

test("Homepage exposes stable raster favicons and each advertised icon decodes", async ({ page, request }) => {
  const response = await request.get("/");
  const html = await response.text();
  const icons = await page.evaluate((source) => {
    const doc = new DOMParser().parseFromString(source, "text/html");
    return [...doc.querySelectorAll('link[rel*="icon"]')].map((node) => ({
      rel: node.getAttribute("rel"),
      href: node.getAttribute("href"),
      sizes: node.getAttribute("sizes"),
      type: node.getAttribute("type"),
    }));
  }, html);
  expect(icons).toContainEqual({ rel: "icon", href: "/favicon.png", sizes: "96x96", type: "image/png" });
  expect(icons).toContainEqual({ rel: "icon", href: "/favicon.svg", sizes: "any", type: "image/svg+xml" });
  expect(icons).toContainEqual({ rel: "shortcut icon", href: "/favicon.ico", sizes: null, type: null });
  expect(icons).toContainEqual({ rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180", type: null });
  await page.goto("/");
  for (const icon of icons) {
    expect(icon.href).not.toContain("?");
    const asset = await request.get(icon.href);
    expect(asset.status()).toBe(200);
    expect(asset.headers()["content-type"]).not.toContain("text/html");
    const dimensions = await page.evaluate(async (src) => {
      const img = new Image();
      img.src = src;
      await img.decode();
      return [img.naturalWidth, img.naturalHeight];
    }, icon.href);
    if (icon.href.endsWith(".png")) {
      const size = icon.href === "/favicon.png" ? 96 : 180;
      expect(dimensions).toEqual([size, size]);
    }
    if (icon.href.endsWith(".ico")) {
      const ico = await asset.body();
      expect(ico.readUInt16LE(0)).toBe(0);
      expect(ico.readUInt16LE(2)).toBe(1);
      expect(ico.readUInt16LE(4)).toBe(3);
      for (let index = 0; index < 3; index += 1) {
        const entry = 6 + index * 16;
        const offset = ico.readUInt32LE(entry + 12);
        const length = ico.readUInt32LE(entry + 8);
        expect(ico.subarray(offset, offset + 8).toString("hex")).toBe("89504e470d0a1a0a");
        expect(offset + length).toBeLessThanOrEqual(ico.length);
      }
    }
  }
});

test("Sitemap, robots and social image are served as static crawlable assets", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(urls).toHaveLength(19);
  expect(new Set(urls).size).toBe(19);
  expect(urls).toEqual(routes.map((route) => `${origin}${route === "/" ? "" : route}`));
  expect(xml).not.toContain("/404");
  expect(xml).not.toContain("<lastmod>");
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toBe(`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  const image = await request.get("/og/portfolio.png");
  expect(image.ok()).toBe(true);
  expect(image.headers()["content-type"]).toContain("image/png");
  const png = await image.body();
  expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  expect(png.readUInt32BE(16)).toBe(1200);
  expect(png.readUInt32BE(20)).toBe(630);
});

test("404 output is noindex and browser fallback clears inherited home metadata", async ({ request, page }) => {
  const response = await request.get("/404.html");
  const html = await response.text();
  expect(html).toContain('name="robots" content="noindex, follow"');
  expect(html).not.toContain('rel="canonical"');
  expect(html).not.toContain('type="application/ld+json"');
  await page.goto("/missing-portfolio-page");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("not");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
  await expect(page.locator('link[rel="canonical"], meta[property="og:url"], script[type="application/ld+json"]')).toHaveCount(0);
  await page.goto("/work/?utm_source=seo-check");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${origin}/work`);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow, max-image-preview:large");
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
});
