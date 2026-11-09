import { test, expect } from "@playwright/test";

test("Hero retains its original copy, type scale, grid, and two actions", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".identity > span")).toHaveText("Full-stack web developer");
  await expect(page.locator(".identity strong")).toHaveText("Kautsar Rifqi Aditya");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Thoughtful work.");
  await expect(page.locator(".hero h1 .highlight")).toHaveText("Built for the web.");
  await expect(page.locator(".hero-description")).toHaveText("Websites, applications, and practical exploration.");
  await expect(page.locator(".hero-actions a")).toHaveCount(2);
  await expect(page.locator(".hero-actions button")).toHaveCount(0);
  await expect(page.locator(".hero-portrait-scene button")).toHaveCount(0);
  expect(await page.locator(".identity strong").evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBe(testInfo.project.name === "desktop" ? 22 : 21);
  expect(await page.locator(".hero").evaluate((element) => getComputedStyle(element, "::before").content)).toBe("none");
  await expect(page.locator(".hero-portrait-scene")).toHaveText("");
  await expect(page.locator(".hero canvas, .orbit-node, .portrait-doodles")).toHaveCount(0);
  const image = page.locator(".hero-portrait img");
  await expect(image).toHaveAttribute("src", "/images/kautsar-cutout.webp");
  await image.evaluate((element) => element.decode());
  expect(await image.evaluate((element) => element.naturalWidth)).toBe(1000);
});

test("Portrait responds within a few pixels and settles back without moving hero text", async ({ page }, testInfo) => {
  await page.goto("/");
  const scene = page.locator(".hero-portrait-scene");
  await scene.scrollIntoViewIfNeeded();
  const interactive = testInfo.project.name === "desktop";
  await expect(scene).toHaveAttribute("data-portrait-interactive", String(interactive));
  const heading = page.locator(".hero h1");
  // Wait for the restored entrance animation before measuring fixed layout.
  await heading.evaluate(async (element) => {
    await Promise.all(element.parentElement.getAnimations().map((animation) => animation.finished));
  });
  const before = await heading.boundingBox();
  const bounds = await scene.boundingBox();
  await page.mouse.move(bounds.x + bounds.width * 0.85, bounds.y + bounds.height * 0.3);
  const offset = () => scene.evaluate((element) => Number(element.style.getPropertyValue("--portrait-x")));
  if (interactive) {
    await expect.poll(offset).toBeGreaterThan(0.6);
    expect(await offset()).toBeLessThanOrEqual(0.71);
    const transform = await scene.locator(".portrait-motion-layer").evaluate((element) => {
      const matrix = new DOMMatrix(getComputedStyle(element).transform);
      return [matrix.m41, matrix.m42];
    });
    expect(Math.abs(transform[0])).toBeLessThanOrEqual(5.1);
    expect(Math.abs(transform[1])).toBeLessThanOrEqual(3.1);
  } else {
    expect(await offset()).toBe(0);
  }
  expect(await heading.boundingBox()).toEqual(before);
  await page.mouse.move(5, 5);
  await expect.poll(async () => Math.abs(await offset())).toBeLessThan(0.01);
});

test("Portrait stays static for reduced motion and offscreen content", async ({ page }) => {
  await page.goto("/");
  const scene = page.locator(".hero-portrait-scene");
  await scene.scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(scene).toHaveAttribute("data-portrait-interactive", "false");
  await expect(scene.locator(".portrait-motion-layer")).toHaveCSS("transform", "none");
  await page.mouse.move(1100, 350);
  expect(await scene.evaluate((element) => Number(element.style.getPropertyValue("--portrait-x")))).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator(".site-footer").scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-portrait-interactive", "false");
});

test("Ten larger logo satellites fit the photo column without changing any page layout", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const scene = page.locator(".hero-portrait-scene");
  const stack = scene.locator(".portrait-stack");
  await expect(stack.getByRole("listitem")).toHaveCount(10);
  await expect(stack.getByRole("img", { name: "Go", exact: true })).toHaveCount(1);
  await expect(stack.getByRole("img", { name: "MySQL", exact: true })).toHaveCount(1);
  await expect(stack.getByRole("img", { name: "Node.js", exact: true })).toHaveCount(0);
  await expect(stack.getByRole("img", { name: "Tailwind CSS", exact: true })).toHaveCount(0);
  await expect(stack).toHaveText("");
  for (const image of await stack.locator("img").all()) {
    await image.evaluate((element) => element.decode());
    expect(await image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
  }
  const snapshotLayout = () => page.locator(".site-header, .hero-copy, .hero-portrait, .work-section, .lab-section, .life-section, .site-footer")
    .evaluateAll((elements) => elements.map((element) => {
      const { x, y, width, height } = element.getBoundingClientRect();
      return { x, y, width, height };
    }));
  const before = await snapshotLayout();
  await stack.evaluate((element) => { element.style.display = "none"; });
  expect(await snapshotLayout()).toEqual(before);
  await stack.evaluate((element) => { element.style.display = ""; });
  for (const width of [1440, 820, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    const box = await scene.boundingBox();
    const portrait = await scene.locator(".hero-portrait").boundingBox();
    const backgroundBottom = await scene.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return bounds.bottom - parseFloat(getComputedStyle(element, "::before").bottom);
    });
    expect(Math.abs(portrait.y + portrait.height - backgroundBottom)).toBeLessThan(1);
    const photo = await scene.locator(".hero-portrait img").boundingBox();
    const face = { left: photo.x + photo.width * 0.3, right: photo.x + photo.width * 0.76, top: photo.y + photo.height * 0.04, bottom: photo.y + photo.height * 0.34 };
    for (const logo of await stack.getByRole("listitem").all()) {
      const bounds = await logo.boundingBox();
      expect(bounds.width).toBeGreaterThanOrEqual(30);
      expect(bounds.x).toBeGreaterThanOrEqual(box.x);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(box.x + box.width);
      expect(bounds.y).toBeGreaterThanOrEqual(box.y);
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(box.y + box.height);
      if ((await logo.getAttribute("class")).includes("is-front")) {
        const coversFace = bounds.x < face.right && bounds.x + bounds.width > face.left && bounds.y < face.bottom && bounds.y + bounds.height > face.top;
        expect(coversFace, `logo covers face at ${width}px`).toBe(false);
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("Logo motion holds for hover and stops offscreen or for reduced motion without controls", async ({ page }, testInfo) => {
  await page.goto("/");
  const scene = page.locator(".hero-portrait-scene");
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-satellites-running", "true");
  const firstLogo = scene.locator(".portrait-satellite.is-front").first();
  const first = firstLogo.locator(".portrait-satellite-float");
  const time = () => first.evaluate(async (element) => {
    const animation = element.getAnimations().find((entry) => entry.id === "portrait-drift");
    await animation.ready;
    return animation.currentTime;
  });
  const start = await time();
  await expect.poll(time).toBeGreaterThan(start);
  await expect(scene.getByRole("button")).toHaveCount(0);
  if (testInfo.project.name === "desktop") {
    await firstLogo.hover();
    const hovered = await time();
    await page.waitForTimeout(200);
    expect(await time()).toBe(hovered);
    await expect.poll(() => firstLogo.locator(".portrait-satellite-art").evaluate((element) => {
      const matrix = new DOMMatrix(getComputedStyle(element).transform);
      return Math.hypot(matrix.m11, matrix.m12, matrix.m13);
    })).toBeGreaterThan(1.1);
    await page.mouse.move(5, 5);
    await expect.poll(time).toBeGreaterThan(hovered);
  }
  await page.locator(".site-footer").scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-satellites-running", "false");
  const offscreen = await time();
  await page.waitForTimeout(150);
  expect(await time()).toBe(offscreen);
  await scene.scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(scene).toHaveAttribute("data-satellites-running", "false");
  expect(await scene.locator(".portrait-satellite-float").evaluateAll((elements) => elements.flatMap((element) => element.getAnimations()).length)).toBe(0);
  await expect(scene.getByRole("button")).toHaveCount(0);
});

test("Logo motion remains automatic at the restored slower cadence", async ({ page }) => {
  await page.goto("/");
  const scene = page.locator(".hero-portrait-scene");
  await scene.scrollIntoViewIfNeeded();
  await page.mouse.move(5, 5);
  await expect(scene).toHaveAttribute("data-satellites-running", "true");
  const durations = await scene.locator(".portrait-satellite-float").evaluateAll((elements) => elements.flatMap((element) =>
    element.getAnimations().filter((animation) => animation.id === "portrait-drift").map((animation) => animation.effect.getComputedTiming().duration),
  ));
  expect(durations).toHaveLength(10);
  expect(Math.min(...durations)).toBeGreaterThanOrEqual(7000);
  expect(Math.max(...durations)).toBeLessThanOrEqual(11400);
  await scene.locator(".portrait-satellite-reveal").evaluateAll(async (elements) => {
    await Promise.all(elements.flatMap((element) => element.getAnimations()).map((animation) => animation.finished));
  });
  const centers = () => scene.locator(".portrait-satellite-float").evaluateAll((elements) => elements.map((element) => {
    const box = element.getBoundingClientRect();
    return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  }));
  const before = await centers();
  await page.waitForTimeout(1100);
  const after = await centers();
  const travel = after.map((point, index) => Math.hypot(point.x - before[index].x, point.y - before[index].y));
  expect(Math.max(...travel)).toBeGreaterThan(2);
});
