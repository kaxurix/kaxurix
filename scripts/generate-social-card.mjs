import { mkdir, readFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { person } from "../src/data/content.js";
import { SITE_URL, escapeHtml } from "../src/utils/seo.js";

// Run manually when the identity changes. Production builds use the checked-in PNG.
const data = async (path, mime) => `data:${mime};base64,${(await readFile(path)).toString("base64")}`;
const [font, mono, portrait] = await Promise.all([
  data("public/fonts/space-grotesk-bold.ttf", "font/ttf"),
  data("public/fonts/jetbrains-mono-regular.ttf", "font/ttf"),
  data(`public${person.heroPortrait}`, "image/webp"),
]);
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
    @font-face { font-family: Display; src: url('${font}'); font-weight: 700; }
    @font-face { font-family: Mono; src: url('${mono}'); }
    * { box-sizing: border-box; } body { margin: 0; color: #242820; background: #f6f4ec; }
    main { width: 1200px; height: 630px; position: relative; overflow: hidden; padding: 54px 60px; }
    .top { display: flex; align-items: center; gap: 16px; font: 15px Mono; }
    .mark { background: #242820; color: #f6f4ec; width: 40px; height: 40px; display: grid; place-items: center; font: 700 27px Display; }
    h1 { position: relative; z-index: 2; margin: 56px 0 22px; font: 700 76px/1.03 Display; letter-spacing: -4px; }
    p { position: relative; z-index: 2; font: 700 25px/1.5 Display; margin: 0; }
    .foot { position: absolute; left: 60px; bottom: 48px; font: 14px Mono; color: #58604f; }
    .panel { position: absolute; width: 390px; height: 450px; bottom: 0; right: 42px; background: #dfe5d6; border-radius: 200px 200px 0 0; }
    img { position: absolute; width: 430px; height: 570px; object-fit: contain; object-position: bottom; bottom: 0; right: 28px; filter: saturate(.7) sepia(.14) contrast(.98) brightness(1.03); }
  </style></head><body><main>
    <div class="top"><span class="mark">K</span><span>PERSONAL PORTFOLIO</span></div>
    <div class="panel"></div><img src="${portrait}" alt="">
    <h1>Kautsar<br>Rifqi Aditya.</h1>
    <p>Full-stack web developer.</p>
    <div class="foot">SELECTED WORK &amp; PRACTICAL EXPLORATION<br><br>${escapeHtml(new URL(SITE_URL).host)}</div>
  </main></body></html>`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => img.decode()));
  });
  await mkdir("public/og", { recursive: true });
  await page.screenshot({ path: "public/og/portfolio.png" });
  console.log("Created public/og/portfolio.png (1200 × 630).");
} finally {
  await browser.close();
}
