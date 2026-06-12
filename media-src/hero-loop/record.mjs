import { chromium } from "/Users/mattsmacmini2/projects/regardskim/node_modules/playwright-core/index.mjs";
import { fileURLToPath } from "url";
import path from "path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = "file://" + path.join(dir, "hero-loop.html");
const outDir = path.join(dir, "out");

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 1,
  recordVideo: { dir: outDir, size: { width: 1600, height: 900 } },
});
const page = await context.newPage();
await page.goto(htmlPath);
// Animation timeline runs ~8.5s; record 9.5s to capture the sent state hold.
await page.waitForTimeout(9500);
await context.close();
await browser.close();
console.log("Recorded to", outDir);
