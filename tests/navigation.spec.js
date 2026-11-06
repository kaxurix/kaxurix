import { test, expect } from "@playwright/test";

test("Mobile navigation closes when keyboard focus leaves the header", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await page.getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Let’s talk" }).focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "View work", exact: true })).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeHidden();
});

test("Mobile navigation resets across breakpoints and preserves visible focus", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/work");
  const toggle = page.getByRole("button", { name: /^(Open|Close) navigation$/, includeHidden: true });
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  await toggle.click();
  const work = navigation.getByRole("link", { name: "Work", exact: true });
  await work.focus();
  await page.screenshot({ path: `artifacts/navigation-${testInfo.project.name}.png` });
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(work).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(navigation).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await toggle.focus();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(work).toBeFocused();
});

test("Mobile navigation fits a short viewport and keeps contact reachable", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 568, height: 240 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  const bounds = await navigation.boundingBox();
  expect(bounds.y + bounds.height).toBeLessThanOrEqual(240);
  const contact = navigation.getByRole("link", { name: "Let’s talk" });
  await contact.focus();
  await expect(contact).toBeInViewport({ ratio: 1 });
  await page.screenshot({ path: `artifacts/navigation-short-${testInfo.project.name}.png` });
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#contact$/);
  await expect(navigation).toBeHidden();
});
