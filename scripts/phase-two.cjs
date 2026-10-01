const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});await page.waitForFunction(()=>window.__AUTUMN_SCENE__);await page.waitForTimeout(2000);
 await page.addStyleTag({content:'main,#spatial-content,.site-header,.chapter-navigation,.custom-cursor,.skip-link,.forest-vignette,.film-grain{visibility:hidden!important}'});
 const checkpoints=[];
 for(const progress of [0,.25,.5,.75,1]){
  await page.evaluate(p=>window.scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*p,behavior:'instant'}),progress);
  await page.waitForTimeout(4500);await page.screenshot({path:`tmp/spatial/phase2-${progress*100}.png`});
  checkpoints.push(await page.evaluate(()=>window.__AUTUMN_SCENE__.snapshot()));
 }
 fs.writeFileSync('tmp/spatial/phase2.json',JSON.stringify({errors,checkpoints},null,2));console.log(JSON.stringify({errors,checkpoints:checkpoints.map(p=>({camera:p.camera,fog:p.fog,progress:p.progress}))}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
