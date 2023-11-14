const puppeteer = require('puppeteer');
const fs = require('fs/promises');

const run = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://www.traversymedia.com');

  // await page.screenshot({ path: 'screenshot.png' });
  // await page.pdf({ path: 'pdf.pdf', format: 'A4' });

  // get full html of a page
  const html = await page.content();

  // get page title
  const title = await page.evaluate(() => document.title);

  // get all text from a page
  const text = await page.evaluate(() => document.body.innerText);

  // get all links from a page
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a'), e => e.href)
  );

  // get all courses information
  const courses = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#cscourses .card'), e => ({
      title: e.querySelector('.card-body h3').innerText,
      level: e.querySelector('.card-body .level').innerText,
      url: e.querySelector('.card-footer a').href,
      promo: e.querySelector('.card-footer .promo-code .promo')?.innerText
    }))
  );

  // get all courses information using eval method
  const coursesUsingEval = await page.$$eval('#cscourses .card', elements =>
    elements.map(e => ({
      title: e.querySelector('.card-body h3').innerText,
      level: e.querySelector('.card-body .level').innerText,
      url: e.querySelector('.card-footer a').href,
      promo: e.querySelector('.card-footer .promo-code .promo')?.innerText
    }))
  );

  // save data to a file

  fs.writeFile('courses.json', JSON.stringify(coursesUsingEval))
    .then(() => console.log('Success'))
    .catch(error => console.log(error));

  await browser.close();
};

run();
