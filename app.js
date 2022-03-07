const puppeteer = require('puppeteer');

const express = require('express')

const app = express()

const port = 3001


/**
 * @type {puppeteer.Browser}
 */
let browser

(async () => {
  browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    // headless: false,
    // args: [
    //     '--proxy-server=localhost:3128'
    // ]
  });
})();

  /**
   * @type {Array<puppeteer.Page>}
   */
  const pageList = []

  app.get('/newpage', async (req, res, next) => {
    if (!browser) {
      return res.send(404)
    }
    try {
      console.log('当前第', pageList.length, '个')

      const page = await browser.newPage();
      await page.goto(req.query.url || 'https://live.douyin.com/770596782915');
      pageList.push(page)
      res.sendStatus(200)

    } catch (error) {
      res.sendStatus(500)
    }
  })


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
