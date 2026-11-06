import { chromium } from "@playwright/test";
import { readFile, writeFile } from "node:fs/promises";

// Resize and encode the supplied transparent photo; preserve its actual pixels.
const original = await readFile("public/erasebg-transformed.png");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage();
  const result = await page.evaluate(async (source) => {
    const photo = new Image();
    photo.src = source;
    await photo.decode();
    const sourceCanvas = document.createElement("canvas");
    sourceCanvas.width = photo.naturalWidth;
    sourceCanvas.height = photo.naturalHeight;
    const sourceContext = sourceCanvas.getContext("2d");
    sourceContext.drawImage(photo, 0, 0);
    const { data } = sourceContext.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
    let left = sourceCanvas.width, top = sourceCanvas.height, right = 0, bottom = 0;
    for (let y = 0; y < sourceCanvas.height; y++) {
      for (let x = 0; x < sourceCanvas.width; x++) {
        if (data[(y * sourceCanvas.width + x) * 4 + 3] === 0) continue;
        left = Math.min(left, x); top = Math.min(top, y);
        right = Math.max(right, x); bottom = Math.max(bottom, y);
      }
    }
    const width = right - left + 1, height = bottom - top + 1;
    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = Math.round(height * canvas.width / width);
    const context = canvas.getContext("2d");
    context.imageSmoothingQuality = "high";
    context.drawImage(photo, left, top, width, height, 0, 0, canvas.width, canvas.height);
    return { width: canvas.width, height: canvas.height, crop: [left, top, width, height], url: canvas.toDataURL("image/webp", 0.9) };
  }, `data:image/png;base64,${original.toString("base64")}`);
  const bytes = Buffer.from(result.url.split(",")[1], "base64");
  await writeFile("public/images/kautsar-cutout.webp", bytes);
  console.log({ width: result.width, height: result.height, crop: result.crop, bytes: bytes.length });
} finally {
  await browser.close();
}
