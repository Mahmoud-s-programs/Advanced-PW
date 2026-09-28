const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
async function main() {
  fs.mkdirSync('tmp/qa', {recursive:true});
  const browser = await chromium.launch({headless:true});
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  const errors = [], warnings = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', msg => {if (['error','warning'].includes(msg.type())) warnings.push(msg.text());});
  await page.goto('http://127.0.0.1:5173/', {waitUntil:'networkidle'});
  await page.waitForTimeout(4000);
  await page.screenshot({path:'tmp/qa/hero-desktop.png'});
  await page.locator('canvas').screenshot({path:'tmp/qa/forest-base.png'});
  for (const id of ['about','skills','projects','work','contact']) {
    await page.evaluate(id => {const el=document.getElementById(id); window.scrollTo({top:el.offsetTop + (id === 'projects' ? 130 : 0),behavior:'instant'});},id);
    await page.waitForTimeout(1200);
    await page.screenshot({path:`tmp/qa/${id}-desktop.png`});
  }
  await page.locator('.extended-toolkit').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({path:'tmp/qa/toolkit-desktop.png'});
  await page.evaluate(() => window.scrollTo({top:document.getElementById('projects').offsetTop+130,behavior:'instant'}));
  for (const [name,slug] of [['Production-Grade RAG Pipeline','rag'],['Multi-Agent Autonomous Pipeline','agents'],['End-to-End MLOps Pipeline','mlops']]) {
    await page.getByRole('button',{name:`Show ${name}`,exact:true}).click();
    await page.waitForTimeout(1600);
    await page.screenshot({path:`tmp/qa/project-${slug}-desktop.png`});
  }
  console.log(JSON.stringify({errors,warnings,webgl:await page.locator('.forest-world').getAttribute('data-webgl'),canvas:await page.locator('canvas').count()}));
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}));
  await page.waitForTimeout(1500);
  await page.screenshot({path:'tmp/qa/hero-mobile.png'});
  await browser.close();
}
main().catch(error => {console.error(error);process.exitCode=1;});
