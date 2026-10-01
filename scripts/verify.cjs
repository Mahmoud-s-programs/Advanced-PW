const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';
const results = [];

async function check(name, fn) {
  try { const detail = await fn(); results.push({name,status:'passed',detail}); console.log(`PASS ${name}`); }
  catch(error) { results.push({name,status:'failed',detail:error.message}); console.log(`FAIL ${name}: ${error.message}`); }
}
async function scrollTo(page,id,offset=0) {
  await page.evaluate(({id,offset}) => window.scrollTo({top:document.getElementById(id).getBoundingClientRect().top+window.scrollY+offset,behavior:'instant'}), {id,offset});
  await page.waitForTimeout(900);
}
async function axe(page, name) {
  await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
  const report = await page.evaluate(async () => window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
  fs.writeFileSync(`tmp/qa/axe-${name}.json`,JSON.stringify(report.violations,null,2));
  assert.equal(report.violations.length,0,JSON.stringify(report.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))));
  return {violations:report.violations.length,passes:report.passes.length};
}
async function main() {
  fs.mkdirSync('tmp/qa',{recursive:true});
  const browser = await chromium.launch({headless:true});
  const context = await browser.newContext({viewport:{width:1440,height:1000}});
  const page = await context.newPage();
  const errors = [], requests = [];
  page.on('pageerror',error => errors.push(error.message));
  page.on('console',message => {if(message.type()==='error') errors.push(message.text());});
  page.on('response',response => {if(response.status()>=400 && response.url().startsWith(base)) requests.push(response.url());});
  await page.goto(base,{waitUntil:'networkidle'});
  await page.waitForTimeout(1800);
  await check('Runtime, assets, semantic landmarks',async () => {
    assert.equal(await page.locator('main').count(),1);
    assert.equal(await page.locator('h1').count(),1);
    assert.equal(await page.locator('canvas').count(),1);
    assert.deepEqual(errors,[]); assert.deepEqual(requests,[]);
    assert.match(await page.title(),/Autumn Afterglow/);
  });
  await check('Keyboard skip link and focus',async () => {
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.skip-link').evaluate(el=>el===document.activeElement),true);
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('main').evaluate(el=>el===document.activeElement),true);
  });
  await check('Every navigation anchor and active section',async () => {
    for(const id of ['about','skills','projects','work','contact']) {
      const anchor=page.locator(`.desktop-nav a[href="#${id}"]`);
      await anchor.click();
      await page.waitForTimeout(1700);
      assert.equal(await anchor.getAttribute('aria-current'),'location');
      assert.equal(await page.locator(`#${id}`).count(),1);
    }
  });
  await check('Resume experience replacement and keyboard details',async () => {
    assert.equal(await page.locator('.experience-details').count(),2);
    assert.equal(await page.locator('.experience-details li').count(),5);
    assert.deepEqual(await page.locator('.company-name').allTextContents(),["Fani's Lab",'Vosyn']);
    assert.match(await page.locator('.experience-trail').textContent(),/12\+ person team/);
    assert.doesNotMatch(await page.locator('.experience-trail').textContent(),/ProStaff|Cleveland-Cliffs|Job Shoppe|Accu-Staff|Personnel By Elsie|25-member/);
    await scrollTo(page,'work',100);
    const summary=page.locator('.experience-details summary').first();
    await summary.focus(); await page.keyboard.press('Enter');
    assert.equal(await page.locator('.experience-details').first().getAttribute('open'),null);
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('.experience-details').first().getAttribute('open'),'');
    const resume=await page.request.get(`${base}/Mahmoud-Alkwisem-Resume-2026.pdf`);
    assert.equal(resume.status(),200);
    assert.equal((await resume.body()).subarray(0,5).toString(),'%PDF-');
  });
  await check('All nine projects, controls, briefs and repositories',async () => {
    await scrollTo(page,'projects',100);
    const names=['Production-Grade RAG Pipeline','Multi-Agent Autonomous Pipeline','End-to-End MLOps Pipeline','3D Portfolio Website','News Aggregator','Chat app','Solar System','Web Calculator','Basic Portfolio'];
    for(let i=0;i<names.length;i++) {
      await page.getByRole('button',{name:`Show ${names[i]}`,exact:true}).click();
      await page.waitForTimeout(1800);
      assert.equal(await page.locator('.project-copy h3').textContent(),names[i]);
      const href=await page.locator('.project-frame').getAttribute('href');
      if(i<3) {
        assert.equal(href,'/Mahmoud-Alkwisem-Resume-2026.pdf#page=1');
        assert.match(await page.locator('.frame-footnote').textContent(),/AI-generated concept artwork/);
        assert.match(await page.locator('.project-image img').getAttribute('alt'),/^Concept artwork:/);
      } else assert.match(href,/^https:\/\/github\.com\/Mahmoud-s-programs\//);
      assert.equal(await page.locator('.project-frame').getAttribute('rel'),'noopener noreferrer');
      const texture=await page.evaluate(i=>window.__AUTUMN_SCENE__.snapshot().projects.find(p=>p.index===i),i);
      assert.ok(texture.textureWidth>0&&texture.textureHeight>0);
      assert.equal(texture.title,names[i]);
      assert.equal(await page.locator('.gallery-count').textContent(),`${String(i+1).padStart(2,'0')} / 09`);
    }
    await page.getByRole('button',{name:'Previous project',exact:true}).focus();
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(1800);
    assert.equal(await page.locator('.project-copy h3').textContent(),'Web Calculator');
  });
  await check('Original skills plus every missing resume skill, filters and keyboard context',async () => {
    await scrollTo(page,'skills',80);
    assert.equal(await page.locator('.skill-node').count(),16);
    assert.deepEqual(await page.locator('.skill-chip').allTextContents(),['Go','C','SQL','Spring Boot','Qdrant','PostgreSQL','MySQL','XGBoost','Transformers','LlamaIndex','LangGraph','Ragas','MLflow','DVC','GitHub Actions','Azure','Claude Code','OpenAI Codex']);
    await page.getByRole('button',{name:'Frontend',exact:true}).click();
    assert.equal(await page.locator('.skill-node:not(.is-dimmed)').count(),4);
    await page.getByRole('button',{name:'React',exact:true}).focus();
    assert.match(await page.locator('.skill-context').textContent(),/Component-based/);
    await page.keyboard.press('Enter');
    assert.equal(await page.getByRole('button',{name:'React',exact:true}).getAttribute('aria-pressed'),'true');
    await page.getByRole('button',{name:'Machine learning',exact:true}).click();
    assert.equal(await page.locator('.skill-chip').count(),6);
    await page.getByRole('button',{name:'LangGraph',exact:true}).focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.getByRole('button',{name:'LangGraph',exact:true}).getAttribute('aria-pressed'),'true');
    assert.match(await page.locator('.skill-context').textContent(),/four research agents/);
    await page.getByRole('button',{name:'All connections',exact:true}).click();
  });
  await check('All four original testimonials',async () => {
    for(const name of ['Ali Alsalkhadi','Ahmad Kouaissem','Kareem Sawatri','Hala']) {
      await page.getByRole('button',{name:`Read testimonial from ${name}`,exact:true}).click();
      await page.waitForTimeout(500);
      assert.match(await page.locator('.quote-stage figcaption').textContent(),new RegExp(name));
    }
  });
  await check('Contact validation, draft recovery, delivery handling',async () => {
    await scrollTo(page,'contact',100);
    await page.getByRole('button',{name:'Send a message',exact:true}).click();
    assert.equal(await page.locator('.field-error').count(),3);
    assert.equal(await page.locator('#contact-name').evaluate(el=>el===document.activeElement),true);
    await page.getByLabel('Your name',{exact:true}).fill('Portfolio QA');
    await page.getByLabel('Email address',{exact:true}).fill('qa@example.com');
    await page.getByLabel('What are you thinking?',{exact:true}).fill('A local test message. No email should be sent.');
    await page.reload({waitUntil:'networkidle'}); await scrollTo(page,'contact',100);
    assert.equal(await page.getByLabel('Your name',{exact:true}).inputValue(),'Portfolio QA');
    assert.match(await page.getByLabel('What are you thinking?',{exact:true}).inputValue(),/local test/);
    let apiCalls=0;
    await page.route('**/api.emailjs.com/**',async route=>{apiCalls++; await route.fulfill({status:500,body:'Test failure'});});
    await page.getByRole('button',{name:'Send a message',exact:true}).click();
    await page.waitForTimeout(500);
    assert.match(await page.locator('.form-status').textContent(),/couldn’t be sent|unavailable/);
    assert.equal(await page.getByLabel('Your name',{exact:true}).inputValue(),'Portfolio QA');
    if(apiCalls) {
      await page.unroute('**/api.emailjs.com/**');
      await page.route('**/api.emailjs.com/**',async route=>{apiCalls++; await route.fulfill({status:200,body:'OK'});});
      await page.getByRole('button',{name:'Send a message',exact:true}).click();
      await page.waitForTimeout(500);
      assert.match(await page.locator('.form-status').textContent(),/on its way/);
      assert.equal(await page.getByLabel('Your name',{exact:true}).inputValue(),'');
    }
    return {delivery:apiCalls ? 'Mocked failure and successful retry; no outbound email' : 'Missing configuration fallback; no outbound email',apiCalls};
  });
  await check('Desktop accessibility',async ()=>{await page.unroute('**/api.emailjs.com/**'); return axe(page,'desktop');});
  await check('Easter eggs: golden leaf, sign, secret word',async () => {
    await scrollTo(page,'home');
    await page.getByRole('button',{name:'Catch the golden leaf'}).click();
    assert.match(await page.locator('.discovery-toast').textContent(),/golden hour/);
    await page.keyboard.type('autumn');
    assert.match(await page.locator('.discovery-toast').textContent(),/secret/);
    await page.getByRole('button',{name:'Read the little forest sign'}).click();
    assert.match(await page.locator('.discovery-toast').textContent(),/undergrowth/);
  });
  await check('Quality tiers and geometry cleanup',async () => {
    const samples=[];
    for(const tier of ['high','low','high','low','high','low']) {
      await page.getByLabel('Visual quality').selectOption(tier);
      await page.waitForTimeout(2200);
      assert.equal(await page.locator('.forest-world').getAttribute('data-quality'),tier);
      samples.push(await page.evaluate(()=>window.__AUTUMN_SCENE__.snapshot().metrics));
    }
    const low=samples.filter((_,i)=>i%2);
    assert.ok(low[2].geometries<=low[0].geometries+2,JSON.stringify(samples));
    assert.ok(samples[0].drawCalls<220,JSON.stringify(samples[0]));
    return samples;
  });
  await check('Manual stillness and persistence',async () => {
    await page.getByRole('button',{name:'Pause ambient motion'}).click();
    await page.waitForTimeout(1600);
    assert.equal(await page.locator('html').getAttribute('data-motion'),'reduced');
    assert.equal(await page.locator('.custom-cursor').count(),0);
    assert.equal(await page.locator('.project-exhibit').count(),9);
    const initial=await page.evaluate(()=>window.__AUTUMN_SCENE__.snapshot().frames);
    await page.waitForTimeout(700);
    const after=await page.evaluate(()=>window.__AUTUMN_SCENE__.snapshot().frames);
    assert.ok(after-initial<=2,`Rendered ${after-initial} frames while paused`);
    await page.reload({waitUntil:'networkidle'});
    assert.equal(await page.locator('html').getAttribute('data-motion'),'reduced');
    await page.getByRole('button',{name:'Enable ambient motion'}).click();
  });
  await check('WebGL context loss keeps portfolio usable',async () => {
    await page.locator('canvas').evaluate(canvas=>canvas.dispatchEvent(new Event('webglcontextlost')));
    await page.waitForTimeout(300);
    assert.equal(await page.locator('canvas').count(),0);
    assert.equal(await page.locator('h1').isVisible(),true);
  });
  await context.close();

  for(const [label,width,height] of [['mobile',390,844],['small-mobile',320,700],['tablet',768,1024],['landscape',1024,600]]) {
    const responsive=await browser.newContext({viewport:{width,height},hasTouch:label!=='landscape',isMobile:label.includes('mobile')});
    const view=await responsive.newPage();
    await view.goto(base,{waitUntil:'networkidle'}); await view.waitForTimeout(1000);
    await check(`${label}: layout, content, navigation`,async () => {
      const overflow=await view.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
      assert.equal(overflow,false);
      assert.equal(await view.locator('.project-exhibit').count(),9);
      assert.equal(await view.locator('.skill-node, .skill-chip').count(),34);
      if(label!=='landscape') {
        assert.equal(await view.locator('.custom-cursor').count(),0);
        await view.getByRole('button',{name:'Open navigation'}).click();
        await view.locator('#mobile-navigation a[href="#skills"]').click();
        await view.waitForTimeout(1000);
        assert.equal(await view.locator('#mobile-navigation').isVisible(),false);
      }
      await scrollTo(view,'home');
      await view.screenshot({path:`tmp/qa/hero-${label}.png`});
      await scrollTo(view,'skills',50); await view.screenshot({path:`tmp/qa/skills-${label}.png`});
      await scrollTo(view,'projects',40); await view.screenshot({path:`tmp/qa/projects-${label}.png`});
      await scrollTo(view,'contact',60); await view.screenshot({path:`tmp/qa/contact-${label}.png`});
    });
    if(label==='mobile') await check('Mobile accessibility',()=>axe(view,'mobile'));
    await responsive.close();
  }
  const reduced=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const still=await reduced.newPage(); await still.goto(base,{waitUntil:'networkidle'});
  await check('System reduced motion: no travel, cursor, animated gallery',async () => {
    assert.equal(await still.locator('html').getAttribute('data-motion'),'reduced');
    assert.equal(await still.locator('.custom-cursor').count(),0);
    assert.equal(await still.locator('.project-exhibit').count(),9);
    assert.equal(await still.getByRole('button',{name:'Reduced motion follows your system preference'}).isDisabled(),true);
    await still.waitForFunction(()=>window.__AUTUMN_SCENE__);await still.waitForTimeout(1500);
    const frameCount=await still.evaluate(()=>window.__AUTUMN_SCENE__.snapshot().frames);
    await still.waitForTimeout(700);
    assert.ok((await still.evaluate(()=>window.__AUTUMN_SCENE__.snapshot().frames))-frameCount<=2);
  });
  await reduced.close();
  const fallback=await browser.newContext({viewport:{width:1440,height:1000}});
  await fallback.addInitScript(()=>{
    const getContext=HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/.test(type)?null:getContext.call(this,type,...args);};
    const setItem=Storage.prototype.setItem;
    Storage.prototype.setItem=function(key,value){if(key.startsWith('autumn-'))throw new Error('Storage unavailable');return setItem.call(this,key,value);};
  });
  const flat=await fallback.newPage(); await flat.goto(base,{waitUntil:'networkidle'});
  await check('No WebGL / blocked storage fallback',async () => {
    assert.equal(await flat.locator('.forest-world').getAttribute('data-webgl'),'fallback');
    assert.equal(await flat.locator('canvas').count(),0);
    await flat.getByRole('button',{name:'Catch the golden leaf'}).click();
    await scrollTo(flat,'contact',100); await flat.getByLabel('Your name',{exact:true}).fill('Still usable');
    assert.equal(await flat.getByLabel('Your name',{exact:true}).inputValue(),'Still usable');
    await scrollTo(flat,'home'); await flat.screenshot({path:'tmp/qa/fallback-desktop.png'});
  });
  await fallback.close();
  await browser.close();
  fs.writeFileSync('tmp/qa/verification.json',JSON.stringify({date:new Date().toISOString(),results},null,2));
  const failures=results.filter(result=>result.status==='failed');
  console.log(`${results.length-failures.length}/${results.length} checks passed`);
  if(failures.length) process.exitCode=1;
}
main().catch(error=>{console.error(error);process.exitCode=1;});
