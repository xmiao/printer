import express from "express";
import {genPDF, genPDF2} from "./genPdf";
// import path from "path";

// 文档在 https://pocketadmin.tech/en/puppeteer-generate-pdf
// Puppeteer generate PDF from HTML
// https://github.com/Hopding/pdf-lib
// https://stackoverflow.com/questions/55470714/trying-to-hide-first-footer-header-on-pdf-generated-with-puppeteer
// const printer = require('node-native-printer');

// const edge = require(`edge-js`);
// const hello = edge.func(`async (input) => {
//         return ".NET welcomes " + input.ToString();
//     }`);

const router = express.Router();

router
    .post('/getPDF', async function (req: any, res: any, next: any) {
        const {
            body: {
                header: headerTemplate, footer: footerTemplate,
                htmlFile, f2,
                format = 'A4',
                orientation = "", doPrint,
                pageToPrint
            } = {} as any
        } = req || {};

        if (doPrint) {
            // await printer.print(tmpFileForPrint, {
            //     landscape,
            //     paperSize: format
            // });
        }

        try {
            let options = {
                headerTemplate,
                footerTemplate, format,
                landscape: +orientation === 1, doPrint
            };

            const curTime = new Date();
            const pdf64 = f2 ?
                await genPDF2(htmlFile, f2, options, {pageToPrint}) :
                await genPDF(htmlFile, options, {pageToPrint})
            ;
            const endTime = new Date();
            res
                .status(200)
                .setHeader("Content-Type", "application/json");
            res
                .json({pdf: pdf64, timeSpent: +endTime - +curTime});
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
        // const printers = await printer.listPrinters();
        // const defaultPrinterName = await printer.defaultPrinterName();
        // const info = await printer.printerInfo(defaultPrinterName);
        // const [{HostingPrintQueue: {QueueStatus = ""} = {}} = {}] = info || {};
        // res.setHeader("Content-Type", "application/json");
        // res.json({defaultPrinterName, QueueStatus});
        res.json({some: "test"});
    });

export default router;
