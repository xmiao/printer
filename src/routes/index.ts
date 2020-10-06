import express from "express";
import convertHTMLToPDF from "./cH2Pdf";
import moment from "moment";
import {PDFDocument} from 'pdf-lib';
import path from "path";

// import {PDFDocument} from 'pdf-lib';
// 文档在 https://pocketadmin.tech/en/puppeteer-generate-pdf
// Puppeteer generate PDF from HTML
// https://github.com/Hopding/pdf-lib
// https://stackoverflow.com/questions/55470714/trying-to-hide-first-footer-header-on-pdf-generated-with-puppeteer
// const printer = require('node-native-printer');
const uuid = require("uuid-v4");

// const edge = require(`edge-js`);
// let hello = edge.func(`async (input) => {
//         return ".NET welcomes " + input.ToString();
//     }`);

const router = express.Router();

router
    .post('/getPDF', async function (req: any, res: any, next: any) {
        let {body: {header, footer, htmlFile, format = 'A4', orientation = "", doPrint, pageToPrint} = {} as any} = req || {};
        let headerOptionDefault = {
            // path: 'optionally-saved-test-result.pdf',
            landscape: orientation !== "2",
            format,
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

            let home = path.join(__dirname, '../public/images');
            let fn = `tmpFileForPrint-${moment().format("YYYYMMDD-HHmmss")}-${uuid()}.pdf`;
            let tmpFileForPrint = `${home}\\${fn}`;
            // writeFileSync(tmpFileForPrint, pdf)

            const pdfDoc = await PDFDocument.load(pdf);

            if (pageToPrint === "even" || pageToPrint === "odd") {
                let totalPage = pdfDoc.getPageCount(); //page starts from 0.
                const t = ({"odd": 1, "even": 0} as any)[pageToPrint]; // parity of page to print
                if (t === totalPage % 2) { // check if the last page should be deleted.
                    totalPage--;
                }
                for (let n = totalPage; n > 0; n -= 2) {
                    pdfDoc.removePage(n - 1); //transform to the page index of pdflib
                }
            }
            const pdf64 = await pdfDoc.saveAsBase64();
            if (doPrint) {
                // await printer.print(tmpFileForPrint, {
                //     landscape,
                //     paperSize: format
                // });
            }
            res
                .status(200)
                .setHeader("Content-Type", "application/json");
            res
                .json({pdf: pdf64, path: `/images/${fn}`, timeSpent: +endTime - +curTime});

            // res.setHeader("Content-Type", "application/pdf");
            // res.send(pdf);
        } catch (e) {
            res
                .status(500)
                .setHeader("Content-Type", "application/json");
            res
                .json({error: e});
        }
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
        // let printers = await printer.listPrinters();
        // let defaultPrinterName = await printer.defaultPrinterName();
        // let info = await printer.printerInfo(defaultPrinterName);
        // let [{HostingPrintQueue: {QueueStatus = ""} = {}} = {}] = info || {};
        // res.setHeader("Content-Type", "application/json");
        // res.json({defaultPrinterName, QueueStatus});
        res.json({some: "some"});
    });

export default router;
