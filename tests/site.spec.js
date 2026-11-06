import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { getPage, routes } from "../src/data/content.js";

for (const route of routes) {
  test(`direct entry, semantics, assets, and layout: ${route}`, async ({
    page,
  }, testInfo) => {
    const errors = [];
    const badResponses = [];
    await page.emulateMedia({ reducedMotion: "reduce" });
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("response", (response) => {
      if (response.status() >= 400)
        badResponses.push(`${response.status()} ${response.url()}`);
    });
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("main")).toHaveCount(1);
    const meta = getPage(route);
    await expect(page).toHaveTitle(
      meta.type === "home" ? meta.title : `${meta.title} — kaxurix`,
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      meta.description,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://kaxurix.vercel.app${route === "/" ? "" : route}`,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      await expect
        .poll(() => image.evaluate((element) => element.naturalWidth))
        .toBeGreaterThan(0);
    }
    await page.evaluate(() => {
      document
        .querySelectorAll(".photo-rail")
        .forEach((rail) => rail.scrollTo({ left: 0, behavior: "instant" }));
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    const brokenImages = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.src),
      );
    expect(brokenImages).toEqual([]);
    const invalidLinks = await page.locator("a").evaluateAll(
      (links, knownRoutes) =>
        links.flatMap((link) => {
          const href = link.getAttribute("href");
          if (!href || href === "#") return [href || "(empty link)"];
          const url = new URL(href, location.href);
          if (url.origin !== location.origin) return [];
          const path = url.pathname.replace(/\/+$/, "") || "/";
          if (/\.(pdf|jpe?g)$/i.test(path)) return [];
          if (!knownRoutes.includes(path)) return [url.pathname];
          if (
            url.pathname === location.pathname &&
            url.hash &&
            !document.getElementById(url.hash.slice(1))
          )
            return [url.hash];
          return [];
        }),
      routes,
    );
    expect(invalidLinks).toEqual([]);
    for (const link of await page.locator('a[href$=".pdf"], a[href$=".jpeg"]').all()) {
      const href = await link.getAttribute("href");
      const response = await page.request.get(href);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain(
        href.endsWith(".pdf") ? "application/pdf" : "image/jpeg",
      );
    }
    expect(errors).toEqual([]);
    expect(badResponses).toEqual([]);
    if (
      [
        "/",
        "/work",
        "/lab",
        "/life",
        "/about",
        "/work/idealibs",
        "/life/catalyst-github-for-maba",
      ].includes(route)
    ) {
      await mkdir("artifacts", { recursive: true });
      await page.screenshot({
        path: `artifacts/${testInfo.project.name}-${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}.png`,
        fullPage: true,
      });
    }
  });
}

test("navigation, project detail, history, contact and back to top", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL(/\/work\/?$/);
  await page
    .getByRole("link", { name: "Read about Idealibs", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Idealibs", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Next.js", { exact: true })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/work\/?$/);
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("link", { name: "Let’s talk" }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByRole("link", { name: "Email Kautsar" })).toBeVisible();
  await page.getByRole("link", { name: "BACK TO TOP" }).click();
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeLessThan(110);
});

test("keyboard skip link and mobile menu dismissal", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  if (testInfo.project.name === "mobile") {
    const toggle = page.getByRole("button", { name: "Open navigation" });
    await toggle.click();
    await expect(
      page
        .getByRole("navigation")
        .getByRole("link", { name: "Home", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await page.locator(".hero-portrait").click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  }
});

test("narrow phone and tablet layouts do not overflow", async ({ page }) => {
  for (const width of [320, 360, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/about",
      "/work",
      "/lab",
      "/life",
      "/work/imhomekontraktor",
    ]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} at ${width}px`,
      ).toBe(true);
    }
  }
});

test("reduced motion leaves every section visible and disables movement", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const motion = await page.evaluate(() => ({
    behavior: getComputedStyle(document.documentElement).scrollBehavior,
    animated: [...document.querySelectorAll("*")].filter((element) => {
      const style = getComputedStyle(element);
      return (
        style.animationName !== "none" ||
        style.transitionDuration
          .split(",")
          .some((duration) => parseFloat(duration) > 0)
      );
    }).length,
  }));
  expect(motion).toEqual({ behavior: "auto", animated: 0 });
  await expect(
    page.getByRole("heading", {
      name: "Beyond the work.",
    }),
  ).toBeVisible();
});

test("prerendered content and navigation work without JavaScript", async ({
  browser,
}, testInfo) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: testInfo.project.use.viewport,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Thoughtful work.",
  );
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Selected projects.",
  );
  await page
    .getByRole("link", { name: "Read about Idealibs", exact: true })
    .click();
  await expect(page.getByText("Next.js", { exact: true })).toBeVisible();
  await page.goto("http://127.0.0.1:4173/life");
  await page
    .getByRole("link", {
      name: "Read GitHub at Catalyst",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/\/life\/catalyst-github-for-maba$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "GitHub at Catalyst",
  );
  await context.close();
});

test("removed project route has a useful recovery page", async ({ page }) => {
  await page.goto("/work/e-voting-osis");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Page not found.",
  );
  await page.getByRole("link", { name: "Back to home" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Thoughtful work.",
  );
});

for (const label of ["Work", "Lab", "Life"]) {
  test(`${label} gallery supports buttons, keyboard and reduced motion`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const rail = page.getByRole("region", { name: `${label} photo gallery` });
    const previous = page.getByRole("button", {
      name: `Previous ${label} photo`,
    });
    const next = page.getByRole("button", { name: `Next ${label} photo` });
    await expect(previous).toBeDisabled();
    await expect(next).toBeEnabled();
    expect(
      await rail.evaluate(
        (element) => element.scrollWidth > element.clientWidth,
      ),
    ).toBe(true);
    await next.click();
    await expect
      .poll(() => rail.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(100);
    await expect(previous).toBeEnabled();
    await previous.click();
    await expect
      .poll(() => rail.evaluate((element) => element.scrollLeft))
      .toBeLessThan(3);
    await rail.focus();
    await page.keyboard.press("ArrowRight");
    await expect
      .poll(() => rail.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(100);
    await page.keyboard.press("ArrowLeft");
    await expect
      .poll(() => rail.evaluate((element) => element.scrollLeft))
      .toBeLessThan(3);
    await rail.evaluate((element) =>
      element.scrollTo({ left: element.scrollWidth, behavior: "instant" }),
    );
    await expect(next).toBeDisabled();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

test("Life film keeps rolling and wraps without exposing duplicate links", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/life");
  const rail = page.getByRole("region", { name: "Life photo gallery" });
  await rail.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(rail).toHaveAttribute("data-rolling", "true");
  const start = await rail.evaluate((element) => element.scrollLeft);
  await expect
    .poll(() => rail.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(start + 8);
  await expect(rail.locator("[data-film-copy] a").first()).toHaveAttribute(
    "tabindex",
    "-1",
  );
  await expect(
    rail.getByRole("link", {
      name: "Read GitHub at Catalyst",
      exact: true,
    }),
  ).toHaveCount(1);

  await page.getByRole("button", { name: "Pause Life film" }).click();
  const cycle = await rail.evaluate((element) => {
    const first = element.querySelector(".photo-rail-item");
    const copy = element.querySelector("[data-film-copy]");
    return copy.offsetLeft - first.offsetLeft;
  });
  await rail.evaluate(
    (element, period) =>
      element.scrollTo({ left: period - 2, behavior: "instant" }),
    cycle,
  );
  await page.getByRole("button", { name: "Resume Life film" }).click();
  await page.mouse.move(0, 0);
  await expect(rail).toHaveAttribute("data-rolling", "true");
  await expect
    .poll(() => rail.evaluate((element) => element.scrollLeft))
    .toBeLessThan(100);
  await expect
    .poll(() => rail.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(5);
});

test("Life film keeps rolling on hover and pauses for interaction or keyboard focus", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/life");
  const rail = page.getByRole("region", { name: "Life photo gallery" });
  await rail.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(rail).toHaveAttribute("data-rolling", "true");
  await rail.hover();
  await expect(rail).toHaveAttribute("data-rolling", "true");
  const hovered = await rail.evaluate((element) => element.scrollLeft);
  await expect
    .poll(() => rail.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(hovered + 5);

  const bounds = await rail.boundingBox();
  await page.mouse.down();
  await expect(rail).toHaveAttribute("data-rolling", "false");
  await page.mouse.move(
    bounds.x + bounds.width / 2 - 40,
    bounds.y + bounds.height / 2,
    { steps: 5 },
  );
  await page.mouse.up();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const dragged = await rail.evaluate((element) => element.scrollLeft);
  await page.waitForTimeout(250);
  expect(await rail.evaluate((element) => element.scrollLeft)).toBe(dragged);

  await rail.focus();
  await page.mouse.move(0, 0);
  await expect(rail).toHaveAttribute("data-rolling", "false");
  const focused = await rail.evaluate((element) => element.scrollLeft);
  await page.waitForTimeout(250);
  expect(await rail.evaluate((element) => element.scrollLeft)).toBe(focused);
  await rail.evaluate((element) => element.blur());

  await page.getByRole("button", { name: "Pause Life film" }).click();
  await page.mouse.move(0, 0);
  await expect(
    page.getByRole("button", { name: "Resume Life film" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(rail).toHaveAttribute("data-rolling", "false");
  const paused = await rail.evaluate((element) => element.scrollLeft);
  await page.waitForTimeout(250);
  expect(await rail.evaluate((element) => element.scrollLeft)).toBe(paused);
  await page.getByRole("button", { name: "Resume Life film" }).click();
  await page.mouse.move(0, 0);
  await expect(rail).toHaveAttribute("data-rolling", "true");
});

test("Life auto roll stops offscreen and follows reduced-motion changes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const rail = page.getByRole("region", { name: "Life photo gallery" });
  await expect(rail).toHaveAttribute("data-rolling", "false");
  await rail.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(rail).toHaveAttribute("data-rolling", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(rail).toHaveAttribute("data-rolling", "false");
  await expect(rail.locator("[data-film-copy]")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Pause Life film" }),
  ).toHaveCount(0);
  const reduced = await rail.evaluate((element) => element.scrollLeft);
  await page.waitForTimeout(250);
  expect(await rail.evaluate((element) => element.scrollLeft)).toBe(reduced);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(rail).toHaveAttribute("data-rolling", "true");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(rail).toHaveAttribute("data-rolling", "false");
});
