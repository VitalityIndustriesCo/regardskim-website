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
await page.evaluate(() => {
  document.querySelector(".sentwrap")?.remove();
  // tighten draft card: no flex stretch
  const d = document.querySelector(".draftcard");
  d.style.flex = "none"; d.style.width = "860px";
  const sw = document.querySelector(".suggestwrap"); if (sw) sw.style.width = "860px";
  // restore the suggest button row above the draft for context, side by side feel
  const s = document.querySelector(".suggestwrap");
  if (s) s.style.display = "flex";
});
// capture suggest row + draft card together, tightly
const s = await page.locator(".suggestwrap").boundingBox();
const d = await page.locator(".draftcard").boundingBox();
await page.screenshot({
  path: path.join(out, "step-3-draft.png"),
  clip: { x: d.x - 2, y: s.y - 6, width: d.width + 4, height: (d.y + d.height + 6) - (s.y - 6) },
});
await browser.close();
console.log("done");
