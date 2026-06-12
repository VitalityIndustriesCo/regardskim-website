import { chromium } from "/Users/mattsmacmini2/projects/regardskim/node_modules/playwright-core/index.mjs";
import { fileURLToPath } from "url";
import path from "path";
const dir = path.dirname(fileURLToPath(import.meta.url));
const url = "file://" + path.join(dir, "step-base.html");
const out = path.join(dir, "../../public/images/how-it-works");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
await page.goto(url);
await page.waitForTimeout(800);
const panel = await page.locator(".main > .panel").first().boundingBox();
const rows = page.locator(".main > .panel:first-child .mailrow");
const last = await rows.last().boundingBox();
await page.screenshot({
  path: path.join(out, "step-1-inbox.png"),
  clip: { x: panel.x, y: panel.y, width: panel.width, height: (last.y + last.height + 14) - panel.y },
});
await browser.close();
console.log("done");
