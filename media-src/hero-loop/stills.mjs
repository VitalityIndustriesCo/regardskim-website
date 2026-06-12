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

// Step 1: inbox list panel (left)
await page.locator(".main > .panel").first().screenshot({ path: path.join(out, "step-1-inbox.png") });
// Step 2: email + matched order context (top of right panel)
await page.locator(".emailcard").screenshot({ path: path.join(out, "step-2-email.png") });
await page.locator(".orderstrip").screenshot({ path: path.join(out, "step-2-order.png") });
// Step 2 combined: right panel without sent overlay
await page.evaluate(() => { document.querySelector(".sentwrap")?.remove(); });
await page.locator(".panel.detail").screenshot({ path: path.join(out, "step-2-context.png") });
// Step 3: draft card with send button
await page.locator(".draftcard").screenshot({ path: path.join(out, "step-3-draft.png") });

await browser.close();
console.log("done");
