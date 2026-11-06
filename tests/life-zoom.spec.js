import { test, expect } from "@playwright/test";

test("Life frames fill their previews and the viewer supports zoom, pan, and reset", async ({ page, context }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/life");
  const frame = page.getByRole("link", { name: "Read GitHub at Catalyst", exact: true });
  await expect(frame.locator("img")).toHaveCSS("object-fit", "cover");
  await frame.click();
  const dialog = page.getByRole("dialog");
  const viewport = dialog.getByRole("region", { name: "Image preview" });
  await expect(viewport.locator("img")).toHaveCSS("object-fit", "contain");
  await dialog.getByRole("button", { name: "Zoom in image" }).click();
  await expect(dialog.getByRole("button", { name: "Reset image zoom" })).toHaveAttribute("aria-pressed", "true");
  const dimensions = await viewport.evaluate((element) => ({
    width: element.clientWidth, height: element.clientHeight,
    scrollWidth: element.scrollWidth, scrollHeight: element.scrollHeight,
    left: element.scrollLeft,
  }));
  expect(dimensions.scrollWidth).toBeGreaterThan(dimensions.width * 2);
  expect(dimensions.scrollHeight).toBeGreaterThan(dimensions.height * 2);
  expect(dimensions.left).toBeGreaterThan(0);
  await viewport.focus();
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => viewport.evaluate((element) => element.scrollLeft)).toBeGreaterThan(dimensions.left);
  await expect(dialog).toHaveAccessibleName("GitHub at Catalyst");
  if (testInfo.project.name === "desktop") {
    const bounds = await viewport.boundingBox();
    const before = await viewport.evaluate((element) => element.scrollLeft);
    await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
    await page.mouse.down();
    await page.mouse.move(bounds.x + bounds.width / 2 - 70, bounds.y + bounds.height / 2, { steps: 8 });
    await page.mouse.up();
    expect(await viewport.evaluate((element) => element.scrollLeft)).toBeGreaterThan(before + 50);
  } else {
    const bounds = await viewport.boundingBox();
    const before = await viewport.evaluate((element) => element.scrollLeft);
    const pageTop = await page.evaluate(() => scrollY);
    const session = await context.newCDPSession(page);
    const x = bounds.x + bounds.width / 2;
    const y = bounds.y + bounds.height / 2;
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    for (let i = 1; i <= 8; i++) {
      await session.send("Input.dispatchTouchEvent", {
        type: "touchMove", touchPoints: [{ x: x - i * 10, y }],
      });
      await page.waitForTimeout(16);
    }
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => viewport.evaluate((element) => element.scrollLeft)).toBeGreaterThan(before + 40);
    expect(await page.evaluate(() => scrollY)).toBe(pageTop);
  }
  expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  await page.screenshot({ path: `artifacts/life-zoom-${testInfo.project.name}.png` });
  await dialog.getByRole("button", { name: "Reset image zoom" }).click();
  expect(await viewport.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  await dialog.getByRole("button", { name: "Zoom in image" }).click();
  await dialog.getByRole("button", { name: "Next story" }).click();
  await expect(dialog).toHaveAccessibleName("ISC — Database Speaker");
  await expect(dialog.getByRole("button", { name: "Zoom in image" })).toHaveAttribute("aria-pressed", "false");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(frame).toBeFocused();
});
