import puppeteer from "puppeteer";

/* GET users listing. */
export async function tfs(req: any, res: any, next: any) {
    // const url = `http://tfs2018-web.winning.com.cn:8080/tfs/WINNING-6.0/WiNEX-Inpatient/WiNEX-Inpatient%20%E5%9B%A2%E9%98%9F/`;
    const url = `http://tfs2018-web.winning.com.cn:8080/tfs/WINNING-6.0/WiNEX-Inpatient/WiNEX-Inpatient%20%E5%9B%A2%E9%98%9F/_queries?id=50139361-2b72-40e8-ac37-a2c75a12fa0d&_a=query`;
    const browser = await puppeteer.launch({headless: false});

    const page = await browser.newPage();
    await page.authenticate({username: "mxj", password: "f8w*ad#7"});
    await page.goto(url);
    await page.waitForNavigation({waitUntil: 'networkidle2'});

    //await page.waitFor('input[id=haha]');

    // const browser = await puppeteer.launch({headless: false});
    // const page = await browser.newPage();
    // await page.setViewport({width: 1200, height: 720})
    // await page.goto('https://www.daum.net', { waitUntil: 'networkidle0' }); // wait until page load
    // await page.type('#id', CREDS.username);
    // await page.type('#loginPw', CREDS.password);
// click and wait for navigation
//     await Promise.all([
//         page.click('#loginSubmit'),
//         page.waitForNavigation({ waitUntil: 'networkidle0' }),
//     ]);

    await page.screenshot({path: 'screenshot.png'});
    browser.close();

    res.send('respond with a resource');
}
