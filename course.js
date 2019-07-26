const puppeteer = require('puppeteer');
let i = 1;

async function login() {
  try {
    const browser = await puppeteer.launch({
      headless: true
    });
    // 登陆
    const page = await browser.newPage();
    await page.goto(`http://learn.baidu.com/personalCenterLessonDetail.html?courseId=19141&state=3`);
    await page.waitForSelector('#username');
    await page.focus('#username');
    await page.waitFor(500);
    await page.type('#username', 'yupeng12');
    await page.waitForSelector('#password');
    await page.focus('#password');
    await page.waitFor(500);
    await page.type('#password', 'yp031507..');
    await page.waitFor(500);
    await page.click('#emailLogin');
    
    await getCourse(page, browser);
  } catch (e) {
    console.log('err', e);
  }
}

async function getCourse(page, browser) {
  try {
    i++;
    await page.waitForSelector('.mt10');
    const registerBtn = await page.$$('.registration');
    if (!registerBtn.length) {
      await page.waitFor(3000);
      await page.reload();
      console.log('reload', i);
      await getCourse(page);
    } else {
      registerBtn[0].click();
      console.log('success!!!!');
    }
  } catch (e) {
    await browser.close();
    console.log("re login");
    await login();
  }
}

login();
