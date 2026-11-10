import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

// Rasterize the existing vector monogram without changing its design.
// Checked-in outputs keep production builds independent of a browser install.
const svg = await readFile("public/favicon.svg");
const source = `data:image/svg+xml;base64,${svg.toString("base64")}`;
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  const render = async (size) => {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<html><body style="margin:0"><img src="${source}" width="${size}" height="${size}" style="display:block"></body></html>`);
    await page.locator("img").evaluate((img) => img.decode());
    return page.screenshot({ omitBackground: true });
  };
  await writeFile("public/favicon.png", await render(96));
  await writeFile("public/apple-touch-icon.png", await render(180));

  // ICO directory with standard small sizes, each containing a PNG image.
  const sizes = [16, 32, 48];
  const images = [];
  for (const size of sizes) images.push(await render(size));
  const directory = Buffer.alloc(6 + sizes.length * 16);
  directory.writeUInt16LE(1, 2);
  directory.writeUInt16LE(sizes.length, 4);
  let offset = directory.length;
  images.forEach((png, index) => {
    const entry = 6 + index * 16;
    directory[entry] = sizes[index];
    directory[entry + 1] = sizes[index];
    directory.writeUInt16LE(1, entry + 4);
    directory.writeUInt16LE(32, entry + 6);
    directory.writeUInt32LE(png.length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  });
  await writeFile("public/favicon.ico", Buffer.concat([directory, ...images]));
  console.log("Generated favicon.png (96px), apple-touch-icon.png (180px), favicon.ico (16/32/48px).");
} finally {
  await browser.close();
}
