import express from "express";
import convertHTMLToPDF from "./cH2Pdf";
import {writeFileSync} from "fs";
import moment from "moment";

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
        let {body: {header, footer, htmlFile, format = 'A4', orientation = "", doPrint} = {} as any} = req || {};
        let headerOptionDefault = {
            // path: 'optionally-saved-test-result.pdf',
            landscape: orientation !== "纵向",
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
            console.log(`Total time spent: ${+endTime - +curTime}`);

            // let home = os.homedir();

            let home = "C:\\Users\\miaox\\WebstormProjects\\WinningpPrinter\\public\\images";
            let fn = `tmpFileForPrint-${moment().format("YYYYMMDD-HHmmss")}-${uuid()}.pdf`;
            let tmpFileForPrint = `${home}\\${fn}`;
            writeFileSync(tmpFileForPrint, pdf)

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
                .json({pdf: pdf.toString(), path: `/images/${fn}`});

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
