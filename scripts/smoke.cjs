const assert = require('node:assert/strict');
const fs = require('node:fs');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
async function main() {
  const browser=await chromium.launch({headless:true});
  const evidence=[];
  for(const noWebGL of [false,true]) {
    const context=await browser.newContext({viewport:{width:1440,height:1000}});
    if(noWebGL) await context.addInitScript(()=>{
      const original=HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/.test(type)?null:original.call(this,type,...args);};
    });
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('console',msg=>{if(msg.type()==='error')errors.push(msg.text());});
    page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`);});
    await page.goto('http://127.0.0.1:5175/',{waitUntil:'networkidle'});
    await page.waitForTimeout(1800);
    assert.equal(await page.locator('canvas').count(),noWebGL?0:1);
    await page.screenshot({path:`tmp/qa/production-${noWebGL?'fallback':'hero'}.png`});
    await page.locator('.desktop-nav a[href="#contact"]').click();
    await page.waitForTimeout(1800);
    await page.getByLabel('Your name',{exact:true}).fill('Local QA');
    await page.getByLabel('Email address',{exact:true}).fill('qa@example.com');
    await page.getByLabel('What are you thinking?',{exact:true}).fill('A local production configuration check.');
    await page.route('**/api.emailjs.com/**',route=>route.abort());
    await page.getByRole('button',{name:'Send a message',exact:true}).click();
    assert.match(await page.locator('.form-status').textContent(),/unavailable/);
    await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
    const axe=await page.evaluate(async()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
    assert.deepEqual(axe.violations,[]);
    assert.deepEqual(errors,[]);
    evidence.push({mode:noWebGL?'static fallback':'WebGL',errors,accessibilityViolations:axe.violations.length,missingEmailConfiguration:'verified'});
    await context.close();
  }
  await browser.close();
  fs.writeFileSync('tmp/qa/production.json',JSON.stringify(evidence,null,2));
  console.log(JSON.stringify(evidence));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
