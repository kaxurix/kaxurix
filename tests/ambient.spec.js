import { test, expect } from "@playwright/test";

test("Background respects input capability and reduced motion without covering controls", async ({ page }, testInfo) => {
  await page.goto("/");
  const background = page.locator(".ambient-background");
  await expect(background).toHaveAttribute("aria-hidden", "true");
  await expect(background).toHaveCSS("pointer-events", "none");
  if (testInfo.project.name === "desktop") {
    await expect(background).toHaveAttribute("data-interactive", "true");
    await page.mouse.move(240, 250);
    await expect.poll(() => background.evaluate((element) =>
      parseFloat(element.style.getPropertyValue("--pointer-x")),
    )).toBeLessThan(260);
    await page.mouse.move(900, 340);
    await expect.poll(() => background.evaluate((element) =>
      parseFloat(element.style.getPropertyValue("--pointer-x")),
    )).toBeGreaterThan(850);
  } else {
    await expect(background).not.toHaveAttribute("data-interactive");
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(background).not.toHaveAttribute("data-interactive");
  await expect.poll(() => background.evaluate((element) =>
    element.style.getPropertyValue("--pointer-x"),
  )).toBe("");
  await page.getByRole("link", { name: "View work", exact: true }).click();
  await expect(page).toHaveURL(/\/work$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
