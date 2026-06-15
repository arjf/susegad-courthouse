import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch({
    executablePath: '/nix/store/jjcz2k4gr3a2xq92fh1ap8723s2h69x2-playwright-chromium-headless-shell/chrome-headless-shell-linux64/chrome-headless-shell',
    headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const context = await browser.newContext({ viewport: { width: 430, height: 932 }, isMobile: true, hasTouch: true, locale: 'en-US' });
  const page = await context.newPage();
  await page.goto('https://susegaad-courthouse.vercel.app', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  const issues = [];

  // 1. Check every element for horizontal overflow
  const overflow = await page.evaluate(new Function(`
    var vw = window.innerWidth;
    var bad = [];
    var all = document.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      try {
        var r = all[i].getBoundingClientRect();
        if (r.width > 0 && r.width < 20000 && r.width > vw + 3) {
          bad.push(all[i].tagName + (all[i].id ? '#' + all[i].id : '') + ' w=' + r.width.toFixed(0) + ' vw=' + vw + ' text="' + (all[i].textContent || '').trim().slice(0, 30) + '"');
        }
      } catch(e) {}
    }
    return bad.slice(0, 10);
  `));
  if (overflow.length) issues.push({ type: 'HORIZONTAL_OVERFLOW', detail: overflow });

  // 2. Check text overflow (text wider than parent)
  const textOverflow = await page.evaluate(new Function(`
    var bad = [];
    var all = document.querySelectorAll('p, span, h1, h2, h3, h4, a, button, li');
    for (var i = 0; i < all.length; i++) {
      try {
        var el = all[i];
        var pr = el.parentElement;
        if (!pr) continue;
        var er = el.getBoundingClientRect();
        var prr = pr.getBoundingClientRect();
        if (er.width > prr.width + 2 && er.width > 0 && prr.width > 50) {
          bad.push(el.tagName + ' "' + (el.textContent || '').trim().slice(0, 35) + '" w=' + er.width.toFixed(0) + ' parentW=' + prr.width.toFixed(0));
          if (bad.length > 8) break;
        }
      } catch(e) {}
    }
    return bad;
  `));
  if (textOverflow.length) issues.push({ type: 'TEXT_OVERFLOW', detail: textOverflow });

  // 3. Check what's visible at initial scroll (0)
  const initView = await page.evaluate(new Function(`
    var vh = window.innerHeight;
    var hero = document.querySelector('section');
    var items = [];
    var walk = function(node, depth) {
      if (depth > 9) return;
      if (node.nodeType === 1) {
        var el = node;
        var tag = el.tagName.toLowerCase();
        var r = el.getBoundingClientRect();
        if (r.width < 10 || r.height < 10) { Array.from(el.children).forEach(function(c) { walk(c, depth + 1); }); return; }
        var t = (el.textContent || '').trim().slice(0, 45);
        var cls = typeof el.className === 'string' ? el.className : '';
        var inView = r.top < vh && r.bottom > 0;
        var partiallyHidden = r.top < vh && r.bottom > vh;
        if (tag === 'section') items.push('SECTION');
        else if (inView && t && ['h1','h2','h3','h4','p','span','a','button','img'].includes(tag) && r.height > 15)
          items.push('  ' + tag + ' t=' + r.top.toFixed(0) + ' b=' + r.bottom.toFixed(0) + ' "' + t + '"' + (partiallyHidden ? ' ⚠️PARTIAL' : ''));
        else if (cls.indexOf('leaflet') !== -1) items.push('  MAP t=' + r.top.toFixed(0) + ' b=' + r.bottom.toFixed(0) + (partiallyHidden ? ' ⚠️PARTIAL' : ''));
        else if (t.indexOf('Check on Airbnb') !== -1) items.push('  CALENDAR_HEADER t=' + r.top.toFixed(0));
        else if (t.indexOf('Available') !== -1 && t.indexOf('Likely') !== -1) items.push('  CALENDAR_FOOTER t=' + r.top.toFixed(0) + ' b=' + r.bottom.toFixed(0) + (partiallyHidden ? ' ⚠️PARTIAL' : ''));
        Array.from(el.children).forEach(function(c) { walk(c, depth + 1); });
      }
    };
    walk(hero, 0);
    return items;
  `));
  console.log('=== INITIAL VIEWPORT SCROLL 0 ===');
  initView.forEach(function(l) { console.log(l); });

  // 4. Screenshot at scroll 0
  await page.screenshot({ path: '/tmp/audit-scroll0.png', fullPage: false });
  console.log('\nScreenshot: /tmp/audit-scroll0.png');

  // 5. Full page screenshot
  await page.screenshot({ path: '/tmp/audit-full.png', fullPage: true });
  console.log('Full page: /tmp/audit-full.png');

  // 6. Check ALL sections positions
  const allSections = await page.evaluate(new Function(`
    return Array.from(document.querySelectorAll('section')).map(function(s) {
      var r = s.getBoundingClientRect();
      return { id: s.id || '(hero)', t: r.top.toFixed(0), b: r.bottom.toFixed(0), h: r.height.toFixed(0), heading: (s.querySelector('h1,h2') || {}).textContent };
    });
  `));
  console.log('\n=== ALL SECTIONS ===');
  allSections.forEach(function(s) { console.log('  #' + s.id + ' top=' + s.t + ' bottom=' + s.b + ' h=' + s.h + ' "' + (s.heading || '').slice(0, 30) + '"'); });

  // 7. Check images
  const imgs = await page.evaluate(new Function(`
    return Array.from(document.querySelectorAll('img')).map(function(img) {
      var r = img.getBoundingClientRect();
      return { src: img.src.slice(0, 50), w: r.width.toFixed(0), h: r.height.toFixed(0), top: r.top.toFixed(0), inView: r.top < window.innerHeight && r.bottom > 0 };
    });
  `));
  console.log('\n=== IMAGES ===');
  imgs.forEach(function(i) { console.log('  ' + i.src + ' ' + i.w + 'x' + i.h + ' top=' + i.top + (i.inView ? '' : ' ⚠️OFFSCREEN')); });

  if (issues.length) {
    console.log('\n=== ISSUES FOUND ===');
    issues.forEach(function(iss) {
      console.log(iss.type + ':');
      iss.detail.forEach(function(d) { console.log('  - ' + d); });
    });
  } else {
    console.log('\n✅ No issues detected');
  }

  await browser.close();
  process.exit(0);
})();
