import express from "express";
import convertHTMLToPDF from "./cH2Pdf";
import {writeFileSync} from "fs";
import moment from "moment";
// import {PDFDocument} from 'pdf-lib';
// 文档在 https://pocketadmin.tech/en/puppeteer-generate-pdf
// Puppeteer generate PDF from HTML
// https://github.com/Hopding/pdf-lib
// https://stackoverflow.com/questions/55470714/trying-to-hide-first-footer-header-on-pdf-generated-with-puppeteer
const printer = require('node-native-printer');
const uuid = require("uuid-v4");

// const edge = require(`edge-js`);
// let printerName = a[0];
// await printer.setPrinter(printerName);
// console.log(printerName);
// let hello = edge.func(`async (input) => {
//         return ".NET welcomes " + input.ToString();
//     }`);
// hello('Node.js', function (error: any, result: any) {
//     if (error) throw error;
//     console.log(result);
// });

const router = express.Router();

/* GET home page. */
router
    .post('/getPDF', async function (req: any, res: any, next: any) {
        let {body: {header, footer, htmlFile, doPrint} = {} as any} = req || {};
        let headerOptionDefault = {
            path: 'optionally-saved-test-result.pdf',
            landscape: false,
            displayHeaderFooter: true,
            margin: {
                top: '100px',
                bottom: '100px',
                right: '20px',
                left: '20px'
            }
        };

        let headerOption = Object.assign(headerOptionDefault, {
            headerTemplate: header,
            footerTemplate: footer
        });

        try {
            let curTime = new Date();
            let pdf = await convertHTMLToPDF(htmlFile, headerOption);
            let endTime = new Date();
            console.log(`Total time spent: ${+endTime - +curTime}`);

            if (doPrint) {
                let tmpFileForPrint = `C:\\Users\\miaox\\Desktop\\tmpFileForPrint-${moment().format("YYYYMMDD-HHmmss")}-${uuid()}.pdf`;
                writeFileSync(tmpFileForPrint, pdf)
                await printer.print(tmpFileForPrint);
            }
            res.status(200);
            res.setHeader("Content-Type", "application/pdf");
            res.send(pdf);
        } catch (e) {
            res.status(500);
            res.setHeader("Content-Type", "application/json")
            res.json({error: e});
        }
    });

router
    .post('/genRequest', async function (req: any, res: any, next: any) {
        res.send("ok");
    });

router
    .get('/print', async function (req: any, res, next: any) {
        let a = await printer.listPrinters();

        // await printer.print("C:\\Users\\miaox\\Desktop\\dbmail-a3.pdf");
        // let e = await printer.printerInfo();

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({a}, null, "  "));
    });

/*
sample result.
{
  "defaultPrinterName": "Canon TS3300 series",
  "QueueStatus": "PaperOut"
}
 */
router
    .get('/status', async function (req: any, res, next: any) {
        let printers = await printer.listPrinters();
        let defaultPrinterName = await printer.defaultPrinterName();
        let info = await printer.printerInfo(defaultPrinterName);
        // let curPrinter = await printer.getCurrentPrinter();
        // let prt = await printer.setPrinter(defaultPrinterName);
        // let curPrinterInfo = await printer.printerInfo(curPrinter);

        let [{HostingPrintQueue: {QueueStatus = ""} = {}} = {}] = info || {};
        res.setHeader("Content-Type", "application/json");
        res.json({defaultPrinterName, QueueStatus});
    });

export default router;
