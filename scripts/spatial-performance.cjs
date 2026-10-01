const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs');
(async()=>{
 const native=process.env.NATIVE_GPU==='1';
 const browser=await chromium.launch(native?{headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--use-angle=d3d11','--enable-gpu','--disable-software-rasterizer']}:{headless:true});const results=[];
 for(const tier of ['high','low']){
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.addInitScript(t=>localStorage.setItem('autumn-quality',t),tier);
  await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});await page.waitForFunction(()=>window.__AUTUMN_SCENE__);await page.waitForTimeout(3000);
  const renderer=await page.locator('canvas').evaluate(canvas=>{const gl=canvas.getContext('webgl2');const ext=gl.getExtension('WEBGL_debug_renderer_info');return ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):'unavailable';});
  const before=await page.evaluate(()=>({time:performance.now(),frames:window.__AUTUMN_SCENE__.snapshot().frames}));await page.waitForTimeout(4000);
  const after=await page.evaluate(()=>({time:performance.now(),...window.__AUTUMN_SCENE__.snapshot()}));
  results.push({tier,renderer,fps:1000*(after.frames-before.frames)/(after.time-before.time),metrics:after.metrics});await page.close();
 }
 fs.writeFileSync(`tmp/spatial/performance${native?'-native':''}.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
