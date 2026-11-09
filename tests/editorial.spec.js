import { test, expect } from "@playwright/test";

test("Homepage features the latest project and keeps the remaining work rail usable", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const feature = page.locator(".showcase-project--featured");
  const rail = page.getByRole("region", { name: "Work photo gallery" });
  await expect(feature.getByRole("heading", { name: "Ngudi Laras", exact: true })).toBeVisible();
  await expect(rail.locator(".showcase-project")).toHaveCount(4);
  await expect(page.locator(".showcase-project")).toHaveCount(5);
  const featureImage = feature.locator(".showcase-visual");
  await featureImage.locator("img").evaluate((image) => image.decode());
  if (testInfo.project.name === "desktop") {
    expect((await featureImage.boundingBox()).width).toBeGreaterThan(
      (await rail.locator(".showcase-visual").first().boundingBox()).width * 1.4,
    );
  }
  await rail.focus();
  await page.keyboard.press("End");
  await expect.poll(() => rail.evaluate((element) => element.scrollLeft)).toBeGreaterThan(100);
  await page.keyboard.press("Home");
  await expect.poll(() => rail.evaluate((element) => element.scrollLeft)).toBeLessThan(3);
  await feature.getByRole("link", { name: "View project", exact: true }).click();
  await expect(page).toHaveURL(/\/work\/ngudi-laras$/);
});

test("Heading introductions do not replay or move project images when scrolling back", async ({ page }) => {
  await page.goto("/");
  const about = page.locator(".human-layout > h2");
  await about.evaluate((element) => window.scrollTo({ top: scrollY + element.getBoundingClientRect().top - 100, behavior: "instant" }));
  await expect.poll(() => about.evaluate((element) => element.getAnimations().some((animation) => animation.id === "section-intro"))).toBe(true);
  await about.evaluate(async (element) => Promise.all(element.getAnimations().map((animation) => animation.finished)));
  for (const name of ["Work", "Lab", "Life", "Contact", "Life", "Lab", "Work", "About"]) {
    const section = page.locator(`[data-scroll-section="${name}"]`);
    await section.evaluate((element) => window.scrollTo({ top: scrollY + element.getBoundingClientRect().top - 24, behavior: "instant" }));
    const content = await section.locator(".human-copy, .showcase-visual, .showcase-copy, .research-paper, .photo-gallery, .footer-contact").evaluateAll((elements) => elements.map((element) => ({
      opacity: getComputedStyle(element).opacity,
      clip: getComputedStyle(element).clipPath,
      transform: getComputedStyle(element).transform,
      animations: element.getAnimations().length,
    })));
    for (const state of content) expect(state).toEqual({ opacity: "1", clip: "none", transform: "none", animations: 0 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  expect(await about.evaluate((element) => element.getAnimations().length)).toBe(0);
  await expect(page.locator("html")).not.toHaveAttribute("data-active-scene");
});

test("Reduced motion settles a heading immediately without hiding content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const heading = page.locator(".human-layout > h2");
  await heading.evaluate((element) => window.scrollTo({ top: scrollY + element.getBoundingClientRect().top - 100, behavior: "instant" }));
  await expect.poll(() => heading.evaluate((element) => element.getAnimations().length)).toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(heading).toHaveCSS("opacity", "1");
  await expect(heading).toHaveCSS("transform", "none");
  expect(await heading.evaluate((element) => element.getAnimations().length)).toBe(0);
});

test("Photo dialogs open and dismiss directly without a document image transition", async ({ page }) => {
  await page.addInitScript(() => {
    window.transitionCalls = 0;
    document.startViewTransition = () => { window.transitionCalls++; throw new Error("Unexpected document transition"); };
  });
  await page.goto("/life");
  const frame = page.getByRole("link", { name: "Read ISC — Database Speaker", exact: true });
  await frame.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCSS("transform", "none");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(frame).toBeFocused();
  await frame.click();
  await page.getByRole("button", { name: "Close photo story" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(await page.evaluate(() => window.transitionCalls)).toBe(0);
});
