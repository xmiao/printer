import puppeteer from "puppeteer";

let browser: any = null;
let page: any = null;

let convertHTMLToPDF = async (html: string,
                              options?: puppeteer.PDFOptions,
                              puppeteerArgs?: puppeteer.LaunchOptions,
                              remoteContent?: boolean) => {
    if (typeof html !== 'string') {
        throw new Error(
            'Invalid Argument: HTML expected as type of string and received a value of a different type. Check your request body and request headers.'
        );
    }
    if (!browser) {
        if (puppeteerArgs) {
            browser = await puppeteer.launch(puppeteerArgs);
        } else {
            browser = await puppeteer.launch();
        }
        page = await browser.newPage();
    }
    if (!options) {
        options = {format: 'Letter'};
    }

    if (remoteContent === true) {
        await page.goto(`data:text/html;base64,${Buffer.from(html).toString('base64')}`, {
            waitUntil: 'networkidle0'
        });
    } else {
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
        //page.setContent will be faster than page.goto if html is a static
        await page.setContent(html);
    }

    let curTime = new Date();
    console.log(curTime);
    let pdf = await page.pdf(options);
    let endTime = new Date();
    console.log(endTime);
    console.log(`Generating PDF: ${+endTime - +curTime}`);

    // await browser.close();
    return pdf;
};

export default convertHTMLToPDF;
