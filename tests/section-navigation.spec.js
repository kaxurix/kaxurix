import { test, expect } from "@playwright/test";

test("Section controls follow scroll, navigate both ways, and hide on mobile", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Section navigation" });
  const status = nav.locator(".section-navigation-status");
  await expect(nav).toBeVisible();
  await expect(status).toContainText("Home");
  await expect(nav.getByRole("button", { name: "Previous section", exact: true })).toBeDisabled();
  for (const name of ["About", "Work", "Lab", "Life", "Contact"]) {
    await nav.getByRole("button", { name: `Next section: ${name}`, exact: true }).click();
    await expect(status).toContainText(name);
  }
  await expect(nav.getByRole("button", { name: "Next section", exact: true })).toBeDisabled();
  await nav.getByRole("button", { name: "Previous section: Life" }).focus();
  await page.keyboard.press("Enter");
  await expect(status).toContainText("Life");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(status).toContainText("Home");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(nav).toBeHidden();
  await page.setViewportSize({ width: 820, height: 1180 });
  await expect(nav).toBeVisible();
});

test("Smooth scrolling respects motion preferences across viewport sizes", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await expect(page.locator("html")).toHaveClass(/lenis/);
    await expect(page.getByRole("navigation", { name: "Section navigation" })).toHaveCount(0);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator("html")).not.toHaveClass(/lenis/);
    return;
  }
  await expect(page.locator("html")).toHaveClass(/lenis/);
  const nav = page.getByRole("navigation", { name: "Section navigation" });
  await nav.getByRole("button", { name: "Next section: About" }).click();
  await expect.poll(() => page.evaluate(() => Math.abs(document.querySelector("#human").getBoundingClientRect().top - 24))).toBeLessThan(3);
  await page.mouse.move(400, 400);
  const before = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 380);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 300);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveClass(/lenis/);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("html")).toHaveClass(/lenis/);
  await page.mouse.move(180, 300);
  const mobileStart = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 400);
  await expect.poll(async () => Math.abs(await page.evaluate(() => scrollY) - mobileStart - 400)).toBeLessThan(5);
});

test("Mobile touch follows swipes natively and preserves horizontal gallery swipes", async ({ page, context }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Touch emulation");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/lenis/);
  await page.evaluate(() => {
    window.touchMoveCount = 0;
    window.blockedTouchMoves = 0;
    window.addEventListener("touchmove", (event) => {
      window.touchMoveCount++;
      if (event.defaultPrevented) window.blockedTouchMoves++;
    }, { passive: true });
  });
  const session = await context.newCDPSession(page);
  const swipe = async (x, y, dx, dy) => {
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    for (let i = 1; i <= 12; i++) {
      await session.send("Input.dispatchTouchEvent", {
        type: "touchMove", touchPoints: [{ x: x + dx * i / 12, y: y + dy * i / 12 }],
      });
      await page.waitForTimeout(16);
    }
    const atRelease = await page.evaluate(() => scrollY);
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    return atRelease;
  };
  const atRelease = await swipe(180, 650, 0, -300);
  expect(atRelease).toBeGreaterThan(240);
  expect(await page.evaluate(() => window.touchMoveCount)).toBeGreaterThan(0);
  expect(await page.evaluate(() => window.blockedTouchMoves)).toBe(0);
  await page.goto("/lab");
  const rail = page.getByRole("region", { name: "Lab photo gallery" });
  await rail.scrollIntoViewIfNeeded();
  const box = await rail.boundingBox();
  const top = await page.evaluate(() => scrollY);
  await swipe(box.x + 250, Math.max(box.y + 80, 180), -180, 0);
  await expect.poll(() => rail.evaluate((element) => element.scrollLeft)).toBeGreaterThan(100);
  expect(Math.abs(await page.evaluate(() => scrollY) - top)).toBeLessThan(5);
  await swipe(box.x + 130, Math.max(box.y + 200, 300), 0, -130);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(top + 50);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("Section buttons ease into motion instead of jumping forward", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop section controls");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole("button", { name: "Next section: About" })).toBeVisible();
  const movement = await page.evaluate(async () => {
    const target = document.querySelector("#human").getBoundingClientRect().top + scrollY - 24;
    const start = scrollY;
    const frames = [];
    const began = performance.now();
    document.querySelector(".section-navigation button:last-child").click();
    await new Promise((resolve) => {
      const sample = (now) => {
        frames.push({ elapsed: now - began, progress: (scrollY - start) / (target - start) });
        if (now - began < 1900) requestAnimationFrame(sample);
        else resolve();
      };
      requestAnimationFrame(sample);
    });
    return {
      early: frames.find((frame) => frame.elapsed >= 150)?.progress,
      middle: frames.find((frame) => frame.elapsed >= 600)?.progress,
      finalError: Math.abs(scrollY - target),
    };
  });
  expect(movement.early).toBeGreaterThan(0);
  expect(movement.early).toBeLessThan(0.2);
  expect(movement.middle).toBeGreaterThan(0.2);
  expect(movement.middle).toBeLessThan(0.85);
  expect(movement.finalError).toBeLessThan(3);
});

test("Section controls work on inner pages and suspend behind a Life dialog", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop section controls");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/about");
  const nav = page.getByRole("navigation", { name: "Section navigation" });
  await nav.getByRole("button", { name: "Next section: Background" }).click();
  await expect(nav.locator(".section-navigation-status")).toContainText("Background");
  await page.goto("/life");
  await page.getByRole("link", { name: "Read GitHub at Catalyst", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(nav).toBeHidden();
  await expect(page.locator("html")).toHaveClass(/lenis-stopped/);
  const before = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 400);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(before);
  await page.keyboard.press("Escape");
  await expect(nav).toBeVisible();
  await expect(page.locator("html")).not.toHaveClass(/lenis-stopped/);
});
