import { chromium } from "/Users/mattsmacmini2/projects/regardskim/node_modules/playwright-core/index.mjs";
import { fileURLToPath } from "url";
import path from "path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = "file://" + path.join(dir, "step3-loop.html");
const outDir = path.join(dir, "out");

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1600, height: 820 },
  deviceScaleFactor: 1,
  recordVideo: { dir: outDir, size: { width: 1600, height: 820 } },
});
const page = await context.newPage();
await page.goto(htmlPath);
// Timeline ends ~9.7s; hold the finished state ~2.3s before loop restart.
await page.waitForTimeout(12000);
await context.close();
await browser.close();
console.log("Recorded to", outDir);
