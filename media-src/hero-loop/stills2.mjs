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
  // step 2 variant: hide draft card so panel = email + match + order strip only
  const d = document.querySelector(".draftcard"); if (d) d.style.display = "none";
  const detail = document.querySelector(".panel.detail");
  if (detail) {
    detail.style.flex = "0 0 auto";
    detail.style.height = "auto";
    detail.style.alignSelf = "flex-start";
  }
});
await page.locator(".panel.detail").screenshot({ path: path.join(out, "step-2-context.png") });
await browser.close();
console.log("done");
