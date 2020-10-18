import puppeteer from "puppeteer";
import {PDFDocument} from "pdf-lib";
import * as fs from "fs";
// const uuid = require("uuid-v4");
// import moment from "moment";

export enum ACTION {DELETE = 1}

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
    pdfOptions: any = {},
    printOptions: any = {}
) {
    const noTableStyle = `<style>
    body {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: none;
    }
    td, tr, th {
        border: 1px solid transparent;
    }
    * {
        color: transparent;
    }
    .business-content {
        color: black;
    }
    </style>`;
    const tableStyle = `<style>
        .business-content {
            color: transparent;
        }
    </style>`;

    const f1 = htmlFile
        .replace(/<style forprint><\/style>/, tableStyle);
    console.log(__dirname);
    fs.writeFileSync(__dirname + "/a.html", f1);
    const pdfTable = await convertHTMLToPDF(f1, Object.assign({}, headerOptionDefault, pdfOptions));
    const pdfDoc = await PDFDocument.load(pdfTable);

    const f2 = htmlFile
        .replace(/<style forprint><\/style>/, noTableStyle);
    const pdfNoTable = await convertHTMLToPDF(
        f2,
        Object.assign({},
            headerOptionDefault,
            pdfOptions,
            {displayHeaderFooter: false})
    );
    const pdfDocNT = await PDFDocument.load(pdfNoTable);

    let p1 = await pdfDoc.getPage(0);
    let p2 = await pdfDocNT.getPage(0);
    let pe = await pdfDoc.embedPage(p2);
    p1.drawPage(pe);

    const totalPage = pdfDoc.getPageCount(); //page starts from 0.
    const pageMap = Array(totalPage).fill({source: 0});

    const {pageToPrint} = printOptions;
    const odd = (pageToPrint === "odd"), even = (pageToPrint === "even");
    for (let pageIndex = 0; pageIndex < totalPage; pageIndex++) {
        const n = pageIndex + 1;
        if (odd && n % 2 === 0 || even && n % 2 === 1) {
            Object.assign(pageMap[pageIndex], {
                action: ACTION.DELETE
            });
        }
    }
    for (let pageIndex = totalPage - 1; pageIndex >= 0; pageIndex--) {
        let {[pageIndex]: {action}} = pageMap;
        if (action === ACTION.DELETE)
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

    // await page.emulateMedia('screen');
    await page._emulationManager._client.send(
        'Emulation.setDefaultBackgroundColorOverride',
        {color: {r: 0, g: 0, b: 0, a: 0}}
    );
    return await page.pdf(options);

    // await browser.close();
}

export default convertHTMLToPDF;
