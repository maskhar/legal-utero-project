import { chromium } from 'playwright';
const browser = await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const page = await browser.newPage({viewport:{width:1440,height:900}});
const failures=[]; page.on('requestfailed',r=>failures.push([r.url(),r.failure()?.errorText])); page.on('console',m=>{if(m.type()==='error') failures.push(['console',m.text()])});
await page.goto('http://127.0.0.1:4173/kontak/',{waitUntil:'domcontentloaded'});
await page.locator('.contact-location iframe').scrollIntoViewIfNeeded(); await page.waitForTimeout(7000);
console.log('frames',page.frames().map(f=>({url:f.url()})));console.log('failures',failures);
await page.locator('.contact-location').screenshot({path:'artifacts/qa/screenshots/contact-map-detail.png'});await browser.close();
