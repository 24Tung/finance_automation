const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.goto('https://my.2c2p.com/Login')
  
  await page.setViewport({ width: 1463, height: 947 })
  
  await page.waitForSelector('#divUpdate > table > tbody > tr:nth-child(3) > td')
  await page.click('#divUpdate > table > tbody > tr:nth-child(3) > td')
  
  await page.waitForSelector('table #UserName')
  await page.click('table #UserName')
  
  await page.type('table #UserName', 'tharitnk@gmail.com')
  
  await page.waitForSelector('table > tbody > tr > td > .btn-small')
  await page.click('table > tbody > tr > td > .btn-small')
  
  await navigationPromise
  
  await page.waitForSelector('tbody > tr > .head-td:nth-child(2) > .header-menu-container > .header-menu-text')
  await page.click('tbody > tr > .head-td:nth-child(2) > .header-menu-container > .header-menu-text')
  
  await navigationPromise
  
  await page.waitForSelector('.contentpanel > .green-menu-bar > div > .greenmenu-block-tran:nth-child(2) > .green-menu-normal')
  await page.click('.contentpanel > .green-menu-bar > div > .greenmenu-block-tran:nth-child(2) > .green-menu-normal')
  
  await navigationPromise
  
  await page.waitForSelector('tbody > tr > td > #aCalFrom > img')
  await page.click('tbody > tr > td > #aCalFrom > img')
  
  await page.waitForSelector('div:nth-child(7) > table > tbody > tr:nth-child(2) > td:nth-child(3)')
  await page.click('div:nth-child(7) > table > tbody > tr:nth-child(2) > td:nth-child(3)')
  
  await page.waitForSelector('tr:nth-child(4) > td > table > tbody > tr > td > #aCalTo > img')
  await page.click('tr:nth-child(4) > td > table > tbody > tr > td > #aCalTo > img')
  
  await page.waitForSelector('div > table > tbody > tr:nth-child(2) > td:nth-child(6)')
  await page.click('div > table > tbody > tr:nth-child(2) > td:nth-child(6)')
  
  await page.waitForSelector('table > tbody > tr > td > .btn')
  await page.click('table > tbody > tr > td > .btn')
  
  await navigationPromise
  
  await page.waitForSelector('table > tbody > tr:nth-child(1) > .grid-cell > .viewdetails')
  await page.click('table > tbody > tr:nth-child(1) > .grid-cell > .viewdetails')
  
  await navigationPromise
  
  await page.waitForSelector('table > tbody > tr > td > .downloadlink')
  await page.click('table > tbody > tr > td > .downloadlink')
  
  await page.waitForSelector('table > tbody > tr > .table-label > .backlink')
  await page.click('table > tbody > tr > .table-label > .backlink')
  
  await navigationPromise
  
  await browser.close()
})()