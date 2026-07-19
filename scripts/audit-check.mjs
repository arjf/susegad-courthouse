import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath:
      "/nix/store/jjcz2k4gr3a2xq92fh1ap8723s2h69x2-playwright-chromium-headless-shell/chrome-headless-shell-linux64/chrome-headless-shell",
  });
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    isMobile: true,
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();
  await page.goto("http://localhost:3004", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const results = await page.evaluate(() => {
    const r = {};
    const hero = document.querySelector("section");
    if (hero) {
      const mainFlex = hero.querySelector("div[class*='flex-col md:flex-row']");
      if (mainFlex) {
        r.mainFlexRect = mainFlex.getBoundingClientRect();
        const children = Array.from(mainFlex.children);
        r.mainFlexChildren = children.map((c) => {
          const rc = c.getBoundingClientRect();
          return {
            tag: c.tagName,
            class: c.className.slice(0, 80),
            top: Math.round(rc.top),
            bottom: Math.round(rc.bottom),
            height: Math.round(rc.height),
            width: Math.round(rc.width),
          };
        });
      }
    }
    const cal = document.querySelector("div[class*='rounded-xl border']");
    if (cal) r.calRect = cal.getBoundingClientRect();
    const map = document.querySelector("div[class*='leaflet']");
    if (map) r.mapRect = map.getBoundingClientRect();
    r.bodyWidth = document.body.scrollWidth;
    r.overflowX = document.body.scrollWidth > window.innerWidth;
    r.overflowAmount = document.body.scrollWidth - window.innerWidth;
    return r;
  });

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
