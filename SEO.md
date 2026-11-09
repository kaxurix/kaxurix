# Portfolio SEO

Production origin: **https://kaxurix.vercel.app**. Change `SITE_URL` in `src/utils/seo.js` when moving to a custom domain, regenerate the social card, and rebuild. Redirect the old domain to the new domain at the hosting layer.

`npm run build` prerenders all 19 public routes and a separate `404.html`. Each public page contains its description, canonical URL, Open Graph/Twitter metadata, and JSON-LD in the initial HTML. The browser tab title stays **Kautsar Rifqi Aditya** on every route at the owner's request; descriptions, share titles, visible headings and breadcrumbs distinguish the pages.

Structured data describes the real person, website, pages, collection items and breadcrumbs. About uses `ProfilePage`; project and Life detail pages use generic `CreativeWork`. Event/certificate dates are not presented as publication dates. Unknown dates, ratings and outcomes are omitted. The 404 has `noindex, follow` and no canonical or structured data; the browser fallback clears inherited metadata too.

The build generates `sitemap.xml` from the actual published routes and references it from `robots.txt`. No guessed `lastmod` dates are emitted. The checked-in social image is `public/og/portfolio.png` (1200 × 630); regenerate it with `node scripts/generate-social-card.mjs` when identity, portrait or domain changes. Chrome from the local Playwright setup is needed only to regenerate the image, not to build or host the site.

## After deployment

1. Verify that the production domain is correct and `/work`, a detail route, `/sitemap.xml`, `/robots.txt` and `/og/portfolio.png` load publicly over HTTPS.
2. Confirm an unknown URL returns HTTP **404** and displays `404.html`. Vercel uses the generated file; Vite's local fallback may return HTTP 200, so it does not establish production status behavior.
3. Verify ownership in [Google Search Console](https://search.google.com/search-console) and submit `https://kaxurix.vercel.app/sitemap.xml`. Use URL Inspection on Home, About and a project detail page.
4. Validate the deployed About and detail pages with [Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org/). Generic schema types do not necessarily produce a rich result.
5. Check a shared link's image and text after deployment; social platforms may cache old previews.

Preparation here does not deploy changes or submit the site to an account. Indexing is decided by search engines; sitemap submission does not guarantee it. See [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [ProfilePage guidance](https://developers.google.com/search/docs/appearance/structured-data/profile-page), and the [Open Graph specification](https://ogp.me/).

## Local verification

Run `npm run lint`, `npm run build`, and `npm test`. `tests/seo.spec.js` checks initial response HTML for all routes, schema references, 404/fallback metadata, sitemap membership, and the actual social image file. It does not establish Google's indexing or production HTTP behavior.
