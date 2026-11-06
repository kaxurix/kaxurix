import { test, expect } from "@playwright/test";

test("Work and Life start with the latest content on the homepage and archives", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const work = ["Ngudi Laras", "Soedirman Technophoria", "Catalyst", "Im Home Kontraktor", "Idealibs"];
  const life = ["ISC — Database Speaker", "Ruijie Switch Hands-On", "BNSP — Software Development", "BNSP — Telecommunications", "Oracle Database Foundations", "GitHub at Catalyst"];
  await page.goto("/");
  await expect(page.locator(".showcase-copy h3")).toHaveText(work);
  await expect(page.locator(".journal-item h3")).toHaveText(life);
  await page.goto("/work");
  await expect(page.locator(".showcase-copy h3")).toHaveText(work);
  await page.goto("/life");
  await expect(page.locator(".journal-item h3")).toHaveText(life);
  await page.goto("/life/isc-database-speaker");
  await expect(page.locator(".next-entry").getByRole("link", { name: "Ruijie Switch Hands-On", exact: true })).toHaveAttribute("href", "/life/ruijie-switch-hands-on");
});

test("About keeps a compact introduction with responsive education and activities columns", async ({ page }, testInfo) => {
  await page.goto("/about");
  const education = page.getByRole("region", { name: "Education.", exact: true });
  const activities = page.getByRole("region", { name: "Activities.", exact: true });
  await expect(page.locator(".about-lead")).toHaveText("Informatics student at UNSOED and Database Lab Assistant. I build websites and applications.");
  const left = await education.boundingBox();
  const right = await activities.boundingBox();
  if (testInfo.project.name === "desktop") {
    expect(Math.abs(left.y - right.y)).toBeLessThan(2);
    expect(right.x).toBeGreaterThan(left.x + left.width);
  } else {
    expect(Math.abs(left.x - right.x)).toBeLessThan(2);
    expect(right.y).toBeGreaterThan(left.y + left.height);
  }
  const portrait = await page.locator(".about-portrait").boundingBox();
  expect(portrait.width).toBeLessThanOrEqual(testInfo.project.name === "desktop" ? 360 : 280);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(education.getByRole("heading", { level: 2 })).toHaveText("Education.");
  await expect(education.getByRole("heading", { level: 3 })).toHaveText([
    "Universitas Jenderal Soedirman", "SMK Telkom Purwokerto",
  ]);
  await expect(activities.getByRole("heading", { level: 3 })).toHaveText([
    "Database Lab Assistant", "Staff Software Development",
  ]);
  await expect(activities).toContainText("Catalyst, UNSOED");
  await expect(activities.getByRole("link")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "The GitHub weekly meet" })).toHaveCount(0);
  await expect(page.locator(".site-footer").getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", "https://github.com/kaxurix");
});

test("ISC speaker certificate opens in Life and retains its real metadata and original PDF", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/life");
  const frame = page.getByRole("link", { name: "Read ISC — Database Speaker", exact: true });
  await frame.scrollIntoViewIfNeeded();
  const imageRatio = await frame.locator("img").evaluate(async (image) => {
    await image.decode();
    return image.naturalWidth / image.naturalHeight;
  });
  expect(imageRatio).toBeCloseTo(1.5, 2);
  await frame.click();
  const dialog = page.getByRole("dialog", { name: "ISC — Database Speaker", exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(".story-category")).toContainText("Oct 5, 2026");
  await expect(dialog).toContainText("speaker (pemateri)");
  const original = dialog.getByRole("link", { name: /View certificate/ });
  await expect(original).toHaveAttribute("href", "/sertif%20isc%20kautsar.pdf");
  const response = await page.request.get(await original.getAttribute("href"));
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).length).toBe(446634);
  await page.keyboard.press("Escape");
  await expect(frame).toBeFocused();
  await page.goto("/life/isc-database-speaker");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("ISC — Database Speaker");
  await expect(page.locator(".detail-meta")).toContainText("HMIF UNSOED");
  await expect(page.locator(".detail-meta")).toContainText("329/STF/PB/ISC/HMIF/X/2026");
  await expect(page.locator(".detail-meta time")).toHaveAttribute("datetime", "2026-10-05");
});

test("New About groups and the ISC certificate remain available without JavaScript", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.use.viewport });
  const page = await context.newPage();
  try {
    await page.goto("http://127.0.0.1:4173/about");
    await expect(page.getByRole("region", { name: "Education.", exact: true }).locator("h3")).toHaveCount(2);
    await expect(page.getByRole("region", { name: "Activities.", exact: true })).toContainText("Staff Software Development");
    await page.goto("http://127.0.0.1:4173/life");
    await expect(page.locator(".journal-item h3").first()).toHaveText("ISC — Database Speaker");
    await expect(page.locator(".journal-item h3").last()).toHaveText("GitHub at Catalyst");
    await page.getByRole("link", { name: "Read ISC — Database Speaker", exact: true }).click();
    await expect(page).toHaveURL(/\/life\/isc-database-speaker$/);
    await expect(page.getByRole("link", { name: /View certificate/ })).toHaveAttribute("href", "/sertif%20isc%20kautsar.pdf");
  } finally {
    await context.close();
  }
});
