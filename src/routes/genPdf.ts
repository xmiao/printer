import puppeteer from "puppeteer";
import {PDFDocument} from "pdf-lib";
// const uuid = require("uuid-v4");
// import moment from "moment";

let browser: any = null;
let page: any = null;

const headerOptionDefault = Object.freeze({
    // path: 'optionally-saved-test-result.pdf',
    landscape: false,
    format: "A4",
    displayHeaderFooter: true,
    margin: {
        top: '2cm',
        bottom: '2cm',
        right: '1in',
        left: '1in'
    }
});

export async function genPDF(
    htmlFile: string,
    pdfOptions: any = {},
    printOptions: any = {}
) {
    let pdf = await convertHTMLToPDF(
        htmlFile,
        Object.assign({}, headerOptionDefault, pdfOptions)
    );

    // let fn = `tmpFileForPrint-${moment().format("YYYYMMDD-HHmmss")}-${uuid()}.pdf`;
    // let home = path.join(__dirname, '../public/images');
    // let tmpFileForPrint = `${home}\\${fn}`;
    // writeFileSync(tmpFileForPrint, pdf)

    const pdfDoc = await PDFDocument.load(pdf);
    const totalPage = pdfDoc.getPageCount(); //page starts from 0.
    const pageMap = Array(totalPage).fill({});

    let {pageToPrint} = printOptions;
    const odd = (pageToPrint === "odd"), even = (pageToPrint === "even");
    if (odd || even) {
        for (let pageIndex = 0; pageIndex < totalPage; pageIndex++) {
            const n = pageIndex + 1;
            if (odd && n % 2 === 0) {
                pageMap[pageIndex] = 0;
            }
            if (even && n % 2 === 1) {
                pageMap[pageIndex] = 0;
            }
        }
    }
    for (let pageIndex = totalPage - 1; pageIndex >= 0; pageIndex--) {
        if (!pageMap[pageIndex])
            pdfDoc.removePage(pageIndex);
    }
    return await pdfDoc.saveAsBase64();

}

export async function convertHTMLToPDF(
    html: string,
    options?: puppeteer.PDFOptions,
    puppeteerArgs?: puppeteer.LaunchOptions,
    remoteContent?: boolean) {
    if (typeof html !== 'string') throw new Error(
        'Invalid Argument: HTML expected as type of string and received a value of a different type. Check your request body and request headers.'
    );

    if (!browser) {
        browser = puppeteerArgs ?
            await puppeteer.launch(puppeteerArgs) :
            await puppeteer.launch();
    }
    if (!page) {
        page = await browser.newPage();
    }
    if (!options) {
        options = {format: 'Letter'};
    }

    if (remoteContent === true) {
        await page.goto(`data:text/html;charset='utf-8',${html}`, {waitUntil: 'networkidle0'});
    } else {
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
        //page.setContent will be faster than page.goto if html is a static
        await page.setContent(html);
    }

    return await page.pdf(options);

    // await browser.close();
}

export default convertHTMLToPDF;
