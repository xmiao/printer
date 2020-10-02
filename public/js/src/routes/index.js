"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cH2Pdf_1 = __importDefault(require("./cH2Pdf"));
const fs_1 = require("fs");
const moment_1 = __importDefault(require("moment"));
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
const router = express_1.default.Router();
router
    .post('/getPDF', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { body: { header, footer, htmlFile, format = 'A4', landscape = false, doPrint } = {} } = req || {};
        let headerOptionDefault = {
            // path: 'optionally-saved-test-result.pdf',
            landscape,
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
            let pdf = yield cH2Pdf_1.default(htmlFile, headerOption);
            let endTime = new Date();
            console.log(`Total time spent: ${+endTime - +curTime}`);
            // let home = os.homedir();
            let home = "C:\\Users\\miaox\\WebstormProjects\\WinningpPrinter\\public\\images";
            let fn = `tmpFileForPrint-${moment_1.default().format("YYYYMMDD-HHmmss")}-${uuid()}.pdf`;
            let tmpFileForPrint = `${home}\\${fn}`;
            fs_1.writeFileSync(tmpFileForPrint, pdf);
            if (doPrint) {
                // await printer.print(tmpFileForPrint, {
                //     landscape,
                //     paperSize: format
                // });
            }
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.json({ pdf: pdf.toString(), path: `./images/${fn}` });
            // res.setHeader("Content-Type", "application/pdf");
            // res.send(pdf);
        }
        catch (e) {
            res.status(500);
            res.setHeader("Content-Type", "application/json");
            res.json({ error: e });
        }
    });
});
/*
sample result.
{
  "defaultPrinterName": "Canon TS3300 series",
  "QueueStatus": "PaperOut"
}
 */
router
    .get('/status', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // let printers = await printer.listPrinters();
        // let defaultPrinterName = await printer.defaultPrinterName();
        // let info = await printer.printerInfo(defaultPrinterName);
        // let [{HostingPrintQueue: {QueueStatus = ""} = {}} = {}] = info || {};
        // res.setHeader("Content-Type", "application/json");
        // res.json({defaultPrinterName, QueueStatus});
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map