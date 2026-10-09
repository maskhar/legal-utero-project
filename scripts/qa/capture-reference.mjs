import { chromium } from 'playwright';
import fs from 'node:fs/promises';
await fs.mkdir('artifacts/reference/screenshots', { recursive: true });
await fs.mkdir('artifacts/reference/data', { recursive: true });
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const routes=['','profil/','haki/','penelusuran-merek/','pendaftaran-merek/','proteksi-merek/','brand-tracking/','berita/','kontak/'];
const results=[];
for (const route of routes){
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.goto('https://legal.uteroindonesia.com/'+route,{waitUntil:'networkidle',timeout:120000}).catch(()=>{});
 const slug=route.replaceAll('/','')||'home';
 await page.screenshot({path:`artifacts/reference/screenshots/reference-${slug}-desktop.png`,fullPage:true});
 const info=await page.evaluate(()=>({title:document.title,h1:[...document.querySelectorAll('h1')].map(x=>x.textContent?.trim()).filter(Boolean),h2:[...document.querySelectorAll('h2')].map(x=>x.textContent?.trim()).filter(Boolean),headings:[...document.querySelectorAll('h1,h2,h3')].map(x=>x.textContent?.trim().replace(/\s+/g,' ')).filter(Boolean),links:[...document.querySelectorAll('a')].map(a=>({text:(a.textContent||'').trim().replace(/\s+/g,' '),href:a.href})).filter(x=>x.text),images:[...document.images].map(i=>({src:i.currentSrc||i.src,alt:i.alt,w:i.naturalWidth,h:i.naturalHeight})).filter(x=>x.src),height:document.documentElement.scrollHeight}));
 results.push({route,...info}); await page.close();
}
const mobile=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1}); await mobile.goto('https://legal.uteroindonesia.com/',{waitUntil:'networkidle',timeout:120000}).catch(()=>{}); await mobile.screenshot({path:'artifacts/reference/screenshots/reference-home-mobile.png',fullPage:true});
await fs.writeFile('artifacts/reference/data/reference-audit.json',JSON.stringify(results,null,2));
await browser.close(); console.log(results.map(r=>({route:r.route,title:r.title,height:r.height,h1:r.h1,h2:r.h2.slice(0,8),images:r.images.length})))

