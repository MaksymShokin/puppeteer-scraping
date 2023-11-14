const puppeteer = require('puppeteer');

const run = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://www.traversymedia.com');

  await page.screenshot({ path: 'screenshot.png' });
  await page.pdf({ path: 'pdf.pdf', format: 'A4' });

  await browser.close();
};

run();
