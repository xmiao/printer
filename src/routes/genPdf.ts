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

export async function genPDF2(
    htmlFile: string,
    f2: string,
    pdfOptions: any = {},
    printOptions: any = {}
) {
    const pdfNoTable = await convertHTMLToPDF(
        f2,
        Object.assign({}, headerOptionDefault, pdfOptions, {
            headerTemplate: "",
            footerTemplate: "",
        })
    );
    const pdfDocNT = await PDFDocument.load(pdfNoTable);
    const pdfTable = await convertHTMLToPDF(
        htmlFile,
        Object.assign({}, headerOptionDefault, pdfOptions)
    );
    const pdfDoc = await PDFDocument.load(pdfTable);

    const totalPage = pdfDoc.getPageCount(); //page starts from 0.
    const pageMap = Array(totalPage).fill({source: 0});

    enum ACTION {DELETE = 1}

    const {pageToPrint} = printOptions;
    const odd = (pageToPrint === "odd"), even = (pageToPrint === "even");
    for (let pageIndex = 0; pageIndex < totalPage; pageIndex++) {
        let {} = pageMap;
        const n = pageIndex + 1;
        if (odd && n % 2 === 0 || even && n % 2 === 1) {
            Object.assign(pageMap[pageIndex], {
                action: ACTION.DELETE
            });
        }

    }
    for (let pageIndex = totalPage - 1; pageIndex >= 0; pageIndex--) {
        if (pageMap[pageIndex] === -1)
            pdfDoc.removePage(pageIndex);

    }
    return await pdfDoc.saveAsBase64();
}

export async function genPDF(
    htmlFile: string,
    pdfOptions: any = {},
    printOptions: any = {}
) {
    const pdf = await convertHTMLToPDF(
        htmlFile,
        Object.assign({}, headerOptionDefault, pdfOptions)
    );

    // const fn = `tmpFileForPrint-${moment().format("YYYYMMDD-HHmmss")}-${uuid()}.pdf`;
    // const home = path.join(__dirname, '../public/images');
    // const tmpFileForPrint = `${home}\\${fn}`;
    // writeFileSync(tmpFileForPrint, pdf)

    const pdfDoc = await PDFDocument.load(pdf);
    const totalPage = pdfDoc.getPageCount(); //page starts from 0.
    const pageMap = Array(totalPage).fill({});

    const {pageToPrint} = printOptions;
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
        await page.goto(`data:text/html;charset='utf-8',${html}`, {waitUntil: 'load'}); //'networkidle0'});
    } else {
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
        //page.setContent will be faster than page.goto if html is a static
        await page.setContent(html, {waitUntil: 'load'});
    }
    return await page.pdf(options);

    // await browser.close();
}

export default convertHTMLToPDF;
