import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const browser = await chromium.launch({ channel: "chrome", headless: true });
const baseURL = process.env.HERO_URL || "http://127.0.0.1:5173";
await mkdir("artifacts/hero-satellites", { recursive: true });
try {
  for (const [name, width, height] of [["desktop", 1440, 1000], ["tablet", 820, 1180], ["mobile", 390, 844], ["narrow", 320, 812]]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
    await page.goto(baseURL);
    await page.evaluate(() => document.fonts.ready);
    for (const image of await page.locator(".hero img").all()) await image.evaluate((element) => element.decode());
    await page.screenshot({ path: `artifacts/hero-satellites/${name}.png`, fullPage: false });
    await page.locator(".hero").screenshot({ path: `artifacts/hero-satellites/${name}-section.png` });
    console.log(name, await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth, heroHeight: document.querySelector(".hero").clientHeight })));
    await page.close();
  }
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  await page.goto(baseURL);
  await page.waitForTimeout(1800);
  await page.mouse.move(1080, 290);
  await page.waitForTimeout(1700);
  await page.mouse.move(1320, 530, { steps: 50 });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: "artifacts/hero-satellites/moving-desktop.png" });
  await page.locator(".portrait-satellite--react").hover();
  await page.waitForTimeout(600);
  await page.locator(".hero-portrait-scene").screenshot({ path: "artifacts/hero-satellites/hover-detail.png" });
  await context.close();
} finally {
  await browser.close();
}
