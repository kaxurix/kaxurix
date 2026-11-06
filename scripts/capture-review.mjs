import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const phase = process.argv[2] === "before" ? "before" : "after";
const directory = `artifacts/review-${phase}`;
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
    ["narrow", 320, 812],
    ["tablet", 820, 1180],
  ]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of name === "desktop" || name === "mobile"
      ? [
          "/",
          "/work",
          "/lab",
          "/life",
          "/about",
          "/work/idealibs",
          "/lab/point-of-sale",
        ]
      : ["/"]) {
      await page.goto("http://127.0.0.1:5173" + route);
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((element) => element.decode());
      }
      await page.evaluate(() => {
        document
          .querySelectorAll(".photo-rail")
          .forEach((rail) => rail.scrollTo({ left: 0, behavior: "instant" }));
        window.scrollTo({ top: 0, behavior: "instant" });
      });
      const slug = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
      await page.screenshot({
        path: `${directory}/${name}-${slug}.png`,
        fullPage: true,
      });
      if (route === "/") {
        await page.screenshot({ path: `${directory}/${name}-hero.png` });
        console.log(
          name,
          await page.evaluate(() => ({
            width: innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight,
            heroHeight: Math.round(
              document.querySelector(".hero").getBoundingClientRect().height,
            ),
            nameSize: getComputedStyle(
              document.querySelector(".identity strong"),
            ).fontSize,
            greetingSize: getComputedStyle(
              document.querySelector(".identity > span"),
            ).fontSize,
            navSize: getComputedStyle(document.querySelector(".navigation"))
              .fontSize,
          })),
        );
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
}
