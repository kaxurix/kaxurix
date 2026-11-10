import { collections, getPage, person } from "../data/content.js";

// Update this when moving the portfolio to a custom domain.
export const SITE_URL = "https://kaxurix.vercel.app";
const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;
const socialImage = `${SITE_URL}/og/portfolio.png`;
const socialImageAlt = "Kautsar Rifqi Aditya — full-stack web developer. Selected work and practical exploration.";
export const canonicalUrl = (path) => `${SITE_URL}${path === "/" ? "" : path}`;

export function getSeo(path) {
  const route = new URL(path, SITE_URL).pathname.replace(/\/+$/, "") || "/";
  const page = getPage(route);
  const valid = page.type !== "404";
  const url = valid ? canonicalUrl(route) : null;
  const shareTitle = page.type === "home" ? person.name : `${page.title} — ${person.name}`;
  const graph = [];

  if (valid) {
    const pageId = `${url}#webpage`;
    const webPage = {
      "@type": page.type === "about" ? "ProfilePage" : !page.item && collections[page.type] ? "CollectionPage" : "WebPage",
      "@id": pageId,
      url,
      name: shareTitle,
      description: page.description,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
    };
    graph.push(
      {
        "@type": "Person",
        "@id": personId,
        name: person.name,
        alternateName: person.username,
        url: `${SITE_URL}/about`,
        image: `${SITE_URL}${person.portrait}`,
        description: person.role,
        sameAs: [person.github],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: person.name,
        alternateName: person.username,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      webPage,
    );
    if (page.type === "about") webPage.mainEntity = { "@id": personId };
    if (!page.item && collections[page.type]) {
      const listId = `${url}#collection`;
      webPage.mainEntity = { "@id": listId };
      graph.push({
        "@type": "ItemList",
        "@id": listId,
        numberOfItems: collections[page.type].length,
        itemListElement: collections[page.type].map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: `${SITE_URL}/${page.type}/${item.slug}`,
        })),
      });
    }
    if (page.item) {
      const itemId = `${url}#content`;
      webPage.mainEntity = { "@id": itemId };
      graph.push({
        "@type": "CreativeWork",
        "@id": itemId,
        name: page.item.title,
        description: page.description,
        url,
        image: `${SITE_URL}${page.item.coverImage}`,
        mainEntityOfPage: { "@id": pageId },
      });
    }
    if (route !== "/") {
      const crumbs = [{ name: "Home", url: SITE_URL }];
      if (page.item) crumbs.push({ name: getPage(`/${page.type}`).title, url: `${SITE_URL}/${page.type}` });
      crumbs.push({ name: page.title, url });
      webPage.breadcrumb = { "@id": `${url}#breadcrumbs` };
      graph.push({
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: crumbs.map((crumb, index) => ({
          "@type": "ListItem", position: index + 1, name: crumb.name, item: crumb.url,
        })),
      });
    }
  }
  return {
    title: person.name,
    description: page.description,
    canonical: url,
    shareTitle,
    robots: valid ? "index, follow, max-image-preview:large" : "noindex, follow",
    structuredData: valid ? { "@context": "https://schema.org", "@graph": graph } : null,
  };
}

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => (
  { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]
));

// Shared by prerendering and the browser so fallback routes cannot inherit home metadata.
export function renderSeoHead(seo) {
  const meta = (attribute, key, value) => `<meta data-seo ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return [
    meta("name", "author", person.name),
    meta("name", "robots", seo.robots),
    seo.canonical && `<link data-seo rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
    meta("property", "og:type", "website"),
    meta("property", "og:locale", "en_US"),
    meta("property", "og:site_name", person.name),
    meta("property", "og:title", seo.shareTitle),
    meta("property", "og:description", seo.description),
    seo.canonical && meta("property", "og:url", seo.canonical),
    meta("property", "og:image", socialImage),
    meta("property", "og:image:type", "image/png"),
    meta("property", "og:image:width", "1200"),
    meta("property", "og:image:height", "630"),
    meta("property", "og:image:alt", socialImageAlt),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", seo.shareTitle),
    meta("name", "twitter:description", seo.description),
    meta("name", "twitter:image", socialImage),
    meta("name", "twitter:image:alt", socialImageAlt),
    seo.structuredData && `<script data-seo type="application/ld+json">${JSON.stringify(seo.structuredData).replace(/</g, "\\u003c")}</script>`,
  ].filter(Boolean).join("\n    ");
}
