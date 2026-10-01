const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});await page.waitForFunction(()=>window.__AUTUMN_SCENE__);await page.waitForTimeout(2000);
 const snapshot=()=>page.evaluate(()=>window.__AUTUMN_SCENE__.snapshot());
 const initial=await snapshot();assert.equal(initial.projects.length,9);assert.equal(initial.skills.length,16);
 assert.ok(initial.projects.every(p=>p.textureWidth>0&&p.textureHeight>0));
 assert.ok(new Set(initial.skills.map(p=>p.position[2].toFixed(2))).size>12);
 await page.getByRole('button',{name:'Unfold petals'}).click();await page.waitForTimeout(700);assert.equal((await snapshot()).unfolded,true);
 await page.getByRole('button',{name:'Rotate sculpture'}).click();await page.waitForTimeout(1200);assert.ok((await snapshot()).orbit>.9);
 const scroll=async id=>{await page.evaluate(id=>window.scrollTo({top:document.getElementById(id).offsetTop-100,behavior:'instant'}),id);await page.waitForTimeout(2300);};
 await scroll('skills');await page.getByRole('button',{name:'React',exact:true}).click();assert.equal(await page.getByRole('button',{name:'React',exact:true}).getAttribute('aria-pressed'),'true');
 await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
 const axe=await page.evaluate(()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
 assert.equal(axe.violations.length,0,JSON.stringify(axe.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))));
 await scroll('projects');
 const positions=[];
 for(const [name,slug] of [['Production-Grade RAG Pipeline','rag'],['Multi-Agent Autonomous Pipeline','agents'],['End-to-End MLOps Pipeline','mlops'],['Basic Portfolio','last']]){
  await page.getByRole('button',{name:`Show ${name}`,exact:true}).click();await page.waitForTimeout(2400);
  const state=await snapshot();positions.push(state.camera);
  assert.equal(await page.locator('.project-copy h3').textContent(),name);
  assert.equal(await page.locator('.world-project-link').count(),1);
  await page.screenshot({path:`tmp/spatial/final-project-${slug}.png`});
 }
 assert.ok(positions[0][2]-positions[3][2]>55);
 await scroll('work');await page.getByRole('button',{name:/Vosyn.*Explore experience/}).click();assert.equal(await page.locator('.experience-details').nth(1).getAttribute('open'),'');
 const stageErrors=await page.evaluate(()=>{const nodes=[...document.querySelectorAll('#spatial-content button,#spatial-content a')];return nodes.filter(n=>{const r=n.getBoundingClientRect();return r.left<0||r.top<0||r.right>innerWidth||r.bottom>innerHeight}).map(n=>n.textContent);});assert.deepEqual(stageErrors,[]);
 await page.setViewportSize({width:1024,height:800});await scroll('projects');await page.screenshot({path:'tmp/spatial/final-project-1024.png'});
 await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));await page.waitForTimeout(2400);
 const end=await snapshot();assert.ok(initial.camera[2]-end.camera[2]>160);
 assert.notEqual(initial.fog.color,end.fog.color);assert.deepEqual(errors,[]);
 fs.writeFileSync('tmp/spatial/integration.json',JSON.stringify({passed:true,initial,end,projectCameras:positions,axeViolations:0,errors},null,2));
 console.log('PASS 3D textures, depth, sculpture controls, skill keyboard/filter state, accessibility, camera travel, project links, and experience markers');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
