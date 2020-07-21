const puppeteer = require('puppeteer');
const input = require('./input')
const username = input.username;
const pass = input.pass;
const startDate = input.startDate;
const endDate = input.endDate;

(async () => {
  const browser = await puppeteer.launch({
      headless: true
  });
  const date = + new Date()
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation()
  
  await page.goto('https://my.2c2p.com/Login');
  
  await page.setViewport({ width: 1300, height: 700 })
  console.log("Open Browser...")
  await page.waitForSelector('#divUpdate > table > tbody > tr:nth-child(3) > td')
  await page.click('#divUpdate > table > tbody > tr:nth-child(3) > td')
  
  await page.waitForSelector('table #UserName')
  await page.click('table #UserName')
  console.log("Logging In...")
  await page.type('table #UserName', username)
  await page.type('table #Password', pass)
  
  await page.waitForSelector('table > tbody > tr > td > .btn-small')
  await page.click('table > tbody > tr > td > .btn-small')
  
  await navigationPromise
  
  await page.waitForSelector('tbody > tr > .head-td:nth-child(2) > .header-menu-container > .header-menu-text')
  await page.click('tbody > tr > .head-td:nth-child(2) > .header-menu-container > .header-menu-text')
  
  await navigationPromise
  
  await page.waitForSelector('.contentpanel > .green-menu-bar > div > .greenmenu-block-tran:nth-child(2) > .green-menu-normal')
  await page.click('.contentpanel > .green-menu-bar > div > .greenmenu-block-tran:nth-child(2) > .green-menu-normal')
  
  await navigationPromise
  console.log("Date Input...")
  await page.click('table #DateFrom')
  await page.type('table #DateFrom', startDate)

  await page.click('table #DateTo')
  await page.type('table #DateTo', endDate)

  // await page.waitForSelector('tbody > tr > td > #aCalFrom > img')
  // await page.click('tbody > tr > td > #aCalFrom > img')
  
  // await page.waitForSelector('div:nth-child(7) > table > tbody > tr:nth-child(2) > td:nth-child(3)')
  // await page.click('div:nth-child(7) > table > tbody > tr:nth-child(2) > td:nth-child(3)')
  
  // await page.waitForSelector('tr:nth-child(4) > td > table > tbody > tr > td > #aCalTo > img')
  // await page.click('tr:nth-child(4) > td > table > tbody > tr > td > #aCalTo > img')
  
  // await page.waitForSelector('div > table > tbody > tr:nth-child(2) > td:nth-child(6)')
  // await page.click('div > table > tbody > tr:nth-child(2) > td:nth-child(6)')
  
  await page.waitForSelector('table > tbody > tr > td > .btn')
  await page.click('table > tbody > tr > td > .btn')

  await navigationPromise
  
  await page.waitForSelector('.viewdetails')
  await page.waitFor(3000);

  const linkList = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll('.viewdetails'))
    return tds.map(td => {
       var txt = td.href;
       return txt;
    });
  });
  console.log("Found "+linkList.length+" results...")
  for(let i = 0; i < linkList.length; i++){
    const page2 = await browser.newPage();
    await page2.setViewport({ width: 1300, height: 700 })
    const navigationPromise2 = page2.waitForNavigation() 
    await page2.goto(linkList[i]);

    await navigationPromise2

    
    await page2.waitForSelector('#dvTransactionInfo')

    const dom = await page2.$eval('#dvTransactionInfo', (element) => {
      return element.innerHTML
    })
    
    await page2.setContent(dom) 
    console.log("Saving result no "+i+"...")
    await page2.pdf({path: './pdf/fn_'+date+'_'+i+'.pdf'})

    await page2.close();
  }
  
  
  // await navigationPromise
  
  // await page.waitForSelector('table > tbody > tr:nth-child(1) > .grid-cell > .viewdetails')
  // await page.click('table > tbody > tr:nth-child(1) > .grid-cell > .viewdetails')
  
  // await navigationPromise
  
  // await page.waitForSelector('table > tbody > tr > td > .downloadlink')
  // await page.click('table > tbody > tr > td > .downloadlink')
  
  // await page.waitForSelector('table > tbody > tr > .table-label > .backlink')
  // await page.click('table > tbody > tr > .table-label > .backlink')
  
  // await navigationPromise
  
  // await browser.close()
})();