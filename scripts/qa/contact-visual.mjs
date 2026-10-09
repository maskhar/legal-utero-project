import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
for (const width of [390, 768, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:4173/kontak/', { waitUntil: 'networkidle' });
  const data = await page.evaluate(() => {
    const eyebrow = document.querySelector('.contact-details .section-title>span')?.getBoundingClientRect();
    const title = document.querySelector('.contact-details .section-title h2')?.getBoundingClientRect();
    const map = document.querySelector('.contact-location iframe')?.getBoundingClientRect();
    return { width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, eyebrowBottom: eyebrow?.bottom, titleTop: title?.top, mapWidth: map?.width, mapHeight: map?.height, mapSrc: document.querySelector('.contact-location iframe')?.getAttribute('src') };
  });
  await page.screenshot({ path: `artifacts/qa/screenshots/contact-${width}.png`, fullPage: true });
  console.log(width, data);
  await page.close();
}
await browser.close();
