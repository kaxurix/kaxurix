import { test, expect } from "@playwright/test";

test("Work filters reset a scrolled rail and keep single-result controls accurate", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work");
  const rail = page.getByRole("region", { name: "Work photo gallery" });
  await rail.focus();
  await page.keyboard.press("End");
  await expect.poll(() => rail.evaluate((element) => element.scrollLeft)).toBeGreaterThan(100);
  await page.getByRole("button", { name: "Next.js", exact: true }).click();
  await expect(page.locator(".showcase-project")).toHaveCount(1);
  await expect(rail.getByRole("heading", { name: "Idealibs", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Next.js", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => rail.evaluate((element) => element.scrollLeft)).toBeLessThan(2);
  await expect(page.getByRole("button", { name: "Next Work photo", exact: true })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Previous Work photo", exact: true })).toBeDisabled();
  await page.getByRole("button", { name: "Laravel", exact: true }).click();
  await expect(page.locator(".showcase-copy h3")).toHaveText(["Ngudi Laras", "Soedirman Technophoria", "Catalyst"]);
  await expect(page.locator(".archive-summary [role=status]")).toHaveText("3 of 5 projects / Laravel");
  await page.getByRole("button", { name: "All projects", exact: true }).click();
  await expect(page.locator(".showcase-project")).toHaveCount(5);
  await page.getByRole("button", { name: "Next Work photo", exact: true }).click();
  await expect.poll(() => rail.evaluate((element) => element.scrollLeft)).toBeGreaterThan(100);
});

test("Work sorting composes with technology filters and preserves archive data", async ({ page }) => {
  await page.goto("/work");
  await expect(page.getByRole("combobox", { name: "Sort by" })).toHaveValue("newest");
  await expect(page.locator(".showcase-copy h3")).toHaveText([
    "Ngudi Laras", "Soedirman Technophoria", "Catalyst", "Im Home Kontraktor", "Idealibs",
  ]);
  await page.getByRole("button", { name: "Laravel", exact: true }).click();
  await expect(page.locator(".showcase-copy h3")).toHaveText(["Ngudi Laras", "Soedirman Technophoria", "Catalyst"]);
  await page.getByRole("combobox", { name: "Sort by" }).selectOption("oldest");
  await expect(page.locator(".showcase-copy h3")).toHaveText(["Catalyst", "Ngudi Laras", "Soedirman Technophoria"]);
  await page.getByRole("button", { name: "All projects", exact: true }).click();
  await page.getByRole("combobox", { name: "Sort by" }).selectOption("archive");
  await expect(page.locator(".showcase-copy h3").first()).toHaveText("Idealibs");
  await page.goto("/");
  await expect(page.locator(".work-archive-controls")).toHaveCount(0);
  await expect(page.locator(".showcase-copy h3").first()).toHaveText("Ngudi Laras");
});

test("Project navigation wraps within Work and Lab collections", async ({ page }) => {
  await page.goto("/work/idealibs");
  let nav = page.getByRole("navigation", { name: "More projects" });
  await nav.getByRole("link", { name: /Previous project/ }).click();
  await expect(page).toHaveURL(/\/work\/imhomekontraktor$/);
  nav = page.getByRole("navigation", { name: "More projects" });
  await nav.getByRole("link", { name: /Next project/ }).click();
  await expect(page).toHaveURL(/\/work\/idealibs$/);
  await page.goto("/lab/tracking-bbm");
  nav = page.getByRole("navigation", { name: "More experiments" });
  await nav.getByRole("link", { name: /Next experiment/ }).click();
  await expect(page).toHaveURL(/\/lab\/point-of-sale$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("POS Warung");
});

test("Copy email writes the contact address to the clipboard", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.locator(".copy-email [role=status]")).toHaveText("Email address copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("kautsarrifqi1@gmail.com");
  await expect(page.getByRole("link", { name: "kautsarrifqi1@gmail.com" })).toHaveAttribute("href", "mailto:kautsarrifqi1@gmail.com");
});

test("Denied clipboard access provides a selected address for manual copying", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: async () => { throw new Error("Clipboard access denied"); } },
    });
  });
  await page.goto("/about");
  await page.getByRole("button", { name: "Copy email address" }).click();
  const input = page.getByRole("textbox", { name: "Email address to copy" });
  await expect(input).toBeFocused();
  await expect(input).toHaveValue("kautsarrifqi1@gmail.com");
  expect(await input.evaluate((element) => element.selectionEnd - element.selectionStart)).toBe("kautsarrifqi1@gmail.com".length);
  await expect(page.locator(".copy-email [role=status]")).toHaveText("Select the address below and copy it.");
});

test("Archive and project navigation remain usable without JavaScript", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto(`${testInfo.project.use.baseURL || "http://127.0.0.1:4173"}/work`);
    await expect(page.locator(".showcase-project")).toHaveCount(5);
    await expect(page.locator(".work-archive-controls")).toBeHidden();
    await expect(page.getByRole("button", { name: "Copy email address" })).toBeHidden();
    await page.getByRole("link", { name: "View project", exact: true }).first().click();
    await page.getByRole("navigation", { name: "More projects" }).getByRole("link", { name: /Next project/ }).click();
    await expect(page).toHaveURL(/\/work\/soedirman-technophoria$/);
  } finally {
    await context.close();
  }
});

test("Work filters support keyboard input on a narrow phone", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.goto("/work");
  await page.getByRole("button", { name: "WordPress", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".showcase-copy h3")).toHaveText(["Im Home Kontraktor"]);
  await expect(page.getByRole("button", { name: "WordPress", exact: true })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: `artifacts/archive-narrow-${test.info().project.name}.png`, fullPage: true });
});
