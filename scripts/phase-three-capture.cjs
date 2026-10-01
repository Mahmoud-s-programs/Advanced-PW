const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});await page.waitForFunction(()=>window.__AUTUMN_SCENE__);await page.waitForTimeout(2500);
 const states=[];
 for(const id of ['home','about','skills','projects','work','contact']){
  await page.evaluate(id=>window.scrollTo({top:Math.max(0,document.getElementById(id).offsetTop-100)+(id==='projects'?260:0),behavior:'instant'}),id);
  await page.waitForTimeout(3500);await page.screenshot({path:`tmp/spatial/final-${id}.png`});
  states.push({id,snapshot:await page.evaluate(()=>window.__AUTUMN_SCENE__.snapshot()),buttons:await page.locator('#spatial-content button').count()});
 }
 console.log(JSON.stringify({errors,states:states.map(s=>({id:s.id,buttons:s.buttons,camera:s.snapshot.camera,metrics:s.snapshot.metrics}))}));
 fs.writeFileSync('tmp/spatial/final-capture.json',JSON.stringify({errors,states},null,2));
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(3000);await page.screenshot({path:'tmp/spatial/final-mobile.png'});
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
