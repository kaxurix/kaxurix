import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

await mkdir("artifacts", { recursive: true });
execFileSync("pdftoppm", ["-f", "1", "-singlefile", "-scale-to", "1800", "-png", "public/sertif isc kautsar.pdf", "artifacts/isc-certificate"], { windowsHide: true });
const source = await readFile("artifacts/isc-certificate.png");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage();
  const result = await page.evaluate(async (url) => {
    const image = new Image();
    image.src = url;
    await image.decode();
    const canvas = document.createElement("canvas");
    // The scan has wide white side margins and a large scanner footer.
    // This 3:2 crop retains the complete certificate, including signatures,
    // while removing that footer and fitting the Life film's exact ratio.
    const crop = { x: image.naturalWidth / 60, y: 0, width: image.naturalWidth * 29 / 30 };
    crop.height = crop.width * 2 / 3;
    canvas.width = 1600;
    canvas.height = Math.round(canvas.width * 2 / 3);
    const context = canvas.getContext("2d");
    context.imageSmoothingQuality = "high";
    context.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height);
    return { width: canvas.width, height: canvas.height, crop, data: canvas.toDataURL("image/webp", 0.92) };
  }, `data:image/png;base64,${source.toString("base64")}`);
  const bytes = Buffer.from(result.data.split(",")[1], "base64");
  await writeFile("public/images/isc-database-speaker.webp", bytes);
  console.log({ width: result.width, height: result.height, bytes: bytes.length });
} finally {
  await browser.close();
}
