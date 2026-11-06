import { test, expect } from "@playwright/test";

test("Work details keep only concise facts and a bounded screenshot", async ({
  page,
}, testInfo) => {
  await page.goto("/work/idealibs");
  const article = page.locator(".work-detail");
  await expect(
    article.getByRole("heading", { name: "Idealibs", exact: true }),
  ).toBeVisible();
  await expect(article.locator("dt")).toHaveText(["Date", "URL", "Tech stack"]);
  await expect(article.locator(".work-detail-description")).toBeVisible();
  await expect(article.getByText("Next.js", { exact: true })).toBeVisible();
  await expect(article.locator("time")).toHaveText("May 2024");
  await expect(article.locator("time")).toHaveAttribute("datetime", "2024-05");
  await expect(
    article.getByRole("link", { name: "idealibs.vercel.app" }),
  ).toHaveAttribute("href", "https://idealibs.vercel.app/");
  await expect(
    article.locator(".detail-body, .detail-editor-note, .detail-sections"),
  ).toHaveCount(0);
  await expect(article.getByRole("heading", { level: 2 })).toHaveCount(0);
  await expect(article.locator(".project-thumbnails")).toHaveCount(0);
  const image = article.locator(".project-gallery-stage");
  const box = await image.boundingBox();
  expect(box.width).toBeLessThanOrEqual(680);
  if (testInfo.project.name === "desktop") expect(box.height).toBeLessThan(400);
});

test("Work and Lab use single scrolling rows with usable case-study links", async ({
  page,
}) => {
  await page.goto("/work");
  const work = page.getByRole("region", { name: "Work photo gallery" });
  await expect(work.locator(".showcase-project")).toHaveCount(5);
  await expect(work.locator(".project-cover--screenshot img")).toHaveCount(5);
  await expect(
    work.getByRole("heading", { name: "Im Home Kontraktor", exact: true }),
  ).toHaveCount(1);
  const workFrames = await work
    .locator(".photo-rail-item")
    .evaluateAll((items) =>
      items.map((item) => item.getBoundingClientRect().top),
    );
  expect(Math.max(...workFrames) - Math.min(...workFrames)).toBeLessThan(1);
  await page
    .getByRole("link", { name: "View project", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/work\/ngudi-laras$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ngudi Laras");
  await page.goto("/lab");
  const lab = page.getByRole("region", { name: "Lab photo gallery" });
  await expect(lab.locator(".research-paper")).toHaveCount(3);
  await expect(lab.locator(".research-copy h3")).toHaveText([
    "Fuel Tracker", "POS Warung", "Riu Logistik",
  ]);
  await expect(lab.locator(".experiment-cover img")).toHaveCount(3);
  await expect(lab.getByText("SCREENSHOT PLACEHOLDER")).toHaveCount(0);
  await expect(lab.getByRole("link", { name: /^Read notes:/ })).toHaveCount(3);
  await expect(lab.locator(".research-index")).toHaveCount(3);
  await expect(lab.locator(".browser-bar")).toHaveCount(0);
  const labFrames = await lab
    .locator(".photo-rail-item")
    .evaluateAll((items) =>
      items.map((item) => item.getBoundingClientRect().top),
    );
  expect(Math.max(...labFrames) - Math.min(...labFrames)).toBeLessThan(1);
  await page.getByRole("link", { name: "Explore Fuel Tracker" }).click();
  await expect(page).toHaveURL(/\/lab\/tracking-bbm$/);
  await expect(page.locator(".work-detail-facts dt")).toHaveText([
    "Date",
    "URL",
    "Tech stack",
    "Source",
  ]);
  await expect(page.locator(".work-detail-facts").getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href", "https://github.com/kaxurix/My-Bahlil",
  );
  await expect(page.locator(".detail-body, .detail-sections")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "BACK TO THE LAB" }),
  ).toHaveAttribute("href", "/lab");
});

test("Life mouse drag moves the film without opening a story", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/life");
  const rail = page.getByRole("region", { name: "Life photo gallery" });
  await rail.scrollIntoViewIfNeeded();
  const box = await rail.boundingBox();
  await page.mouse.move(box.x + 220, box.y + 110);
  await page.mouse.down();
  await page.mouse.move(box.x + 60, box.y + 110, { steps: 12 });
  await page.mouse.up();
  await expect
    .poll(() => rail.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(100);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page).toHaveURL(/\/life$/);
  await rail.focus();
  await page.keyboard.press("Home");
  await expect
    .poll(() => rail.evaluate((element) => element.scrollLeft))
    .toBeLessThan(3);
  await page.keyboard.press("End");
  await expect
    .poll(() => rail.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(100);
});

test("Life lightbox supports keyboard navigation, focus containment and return to opener", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/life");
  const frame = page.getByRole("link", {
    name: "Read GitHub at Catalyst",
    exact: true,
  });
  await frame.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", {
    name: "GitHub at Catalyst",
  });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("link", { name: "Open full story" }),
  ).toHaveCount(0);
  await expect(
    dialog.getByRole("button", { name: "Close photo story" }),
  ).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  // Shift-Tab wraps into the modal's final control, rather than the page behind it.
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("button", { name: "Next story" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Close photo story" }),
  ).toBeFocused();
  await expect(
    page.getByRole("dialog", { name: "GitHub at Catalyst", exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("dialog")
      .getByText("Introduction to GitHub", { exact: true }),
  ).toBeVisible();
  await page.keyboard.press("ArrowRight");
  const certificate = page.getByRole("dialog", {
    name: "ISC — Database Speaker", exact: true,
  });
  await expect(certificate).toBeVisible();
  await expect(certificate.getByRole("link", { name: /View certificate/ })).toHaveAttribute(
    "href", "/sertif%20isc%20kautsar.pdf",
  );
  await expect(certificate.locator(".story-category")).toContainText("Oct 5, 2026");
  await page.screenshot({ path: `artifacts/certificate-lightbox-${test.info().project.name}.png` });
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(frame).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("Life lightbox pauses rolling, fits the viewport and closes with its button or backdrop", async ({
  page,
}) => {
  await page.goto("/life");
  const rail = page.getByRole("region", { name: "Life photo gallery" });
  await rail.scrollIntoViewIfNeeded();
  await page
    .getByRole("link", {
      name: "Read GitHub at Catalyst",
      exact: true,
    })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.mouse.move(0, 0);
  await expect(rail).toHaveAttribute("data-rolling", "false");
  const position = await rail.evaluate((element) => element.scrollLeft);
  await page.waitForTimeout(200);
  expect(await rail.evaluate((element) => element.scrollLeft)).toBe(position);
  expect(
    await dialog.evaluate(
      (element) => element.scrollWidth <= element.clientWidth,
    ),
  ).toBe(true);
  await dialog.getByRole("button", { name: "Next story" }).click();
  await expect(
    page.getByRole("dialog", { name: "ISC — Database Speaker", exact: true }),
  ).toBeVisible();
  await dialog.getByRole("button", { name: "Close photo story" }).click();
  await expect(dialog).toHaveCount(0);
  await page
    .getByRole("link", {
      name: "Read GitHub at Catalyst",
      exact: true,
    })
    .click();
  await expect(dialog).toBeVisible();
  await page.mouse.click(2, 2);
  await expect(dialog).toHaveCount(0);
});

test("Life film keeps native touch swiping and vertical page scrolling", async ({
  page,
  context,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile",
    "Native touch behavior uses mobile Chrome emulation.",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/life");
  const rail = page.getByRole("region", { name: "Life photo gallery" });
  await rail.scrollIntoViewIfNeeded();
  const box = await rail.boundingBox();
  const session = await context.newCDPSession(page);
  const swipe = async (x, y, dx, dy) => {
    await session.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y }],
    });
    for (let i = 1; i <= 10; i++) {
      await session.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: x + (dx * i) / 10, y: y + (dy * i) / 10 }],
      });
      await page.waitForTimeout(16);
    }
    await session.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
  };
  await swipe(box.x + 250, box.y + 100, -180, 0);
  await expect
    .poll(() => rail.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(100);
  const top = await page.evaluate(() => scrollY);
  await swipe(box.x + 130, box.y + 150, 0, -130);
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBeGreaterThan(top + 50);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
