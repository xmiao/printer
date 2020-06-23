import express from "express";
import convertHTMLToPDF from "./cH2Pdf";
import {readFileSync} from "fs";

const printer = require('node-native-printer');
const edge = require(`edge-js`);

const footerTemplate = `<div 
style="
font-size: 6pt;
text-align: right; 
width: 100%; 
height: 20px; 
border-top: 1px solid black; 
color:black; 
font-family: Arial,serif;
margin: 0 1cm;">
第<span class="pageNumber"></span>页 共<span class="totalPages"></span>页 打印日期<span class="date"></span>
</div>`;

const headerTemplate = `<div 
style="
font-size: 12pt; 
width: 100%; 
height: 30px;
text-align: center;
background-color: black; 
border-bottom: 1px solid black;
margin: 0 1cm;
">
人民医院门诊病历
</div>`;

const router = express.Router();

/* GET home page. */
router.get('/', async function (req: any, res: any, next: any) {
    // var ajv = new Ajv({allErrors: true});
    // var schema = {
    //     "properties": {
    //         "foo": {"type": "string"},
    //         "bar": {"type": "number", "maximum": 3}
    //     }
    // };
    // var validate = ajv.compile(schema);
    // test({"foo": "abc", "bar": 2});
    // test({"foo": 2, "bar": 4});
    //
    // function test(data: any) {
    //     var valid = validate(data);
    //     if (valid) console.log('Valid!');
    //     else console.log('Invalid: ' + ajv.errorsText(validate.errors));
    // }

    let text = readFileSync("./public/xm.html", "utf-8");

    let headerOption = {
        path: 'optionally-saved.pdf',
        landscape: false,
        displayHeaderFooter: true,
        headerTemplate,
        footerTemplate,
        margin: {
            top: '100px',
            bottom: '100px',
            right: '20px',
            left: '20px'
        }
    };

    let curTime = new Date();
    let pdf = await convertHTMLToPDF(text, headerOption);
    let endTime = new Date();
    console.log(`Total time spent: ${+endTime - +curTime}`);

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdf);
});

// router.get('/print', async function (req: any, res, next: any) {
//     let a = await printer.listPrinters();
//     let printerName = a[0];
//     await printer.setPrinter(printerName);
//     console.log(printerName);
//     await printer.print("C:\\Users\\miaox\\Desktop\\dbmail-a3.pdf");
//     let e = await printer.printerInfo();
//
//     res.setHeader("Content-Type", "application/json");
//     // res.json({status: "done"});
//     res.send(JSON.stringify({e}, null, "  "));
// });
//
// let hello = edge.func(`async (input) => {
//         return ".NET welcomes " + input.ToString();
//     }`);
//
// router.get('/status', async function (req: any, res, next: any) {
//
//     hello('Node.js', function (error: any, result: any) {
//         if (error) throw error;
//         console.log(result);
//     });
//
//     let a = await printer.listPrinters();
//     let printerName = a[0];
//     let b = await printer.setPrinter(printerName);
//     console.log(printerName);
//     let e = await printer.printerInfo();
//     res.setHeader("Content-Type", "application/json");
//     res.send(JSON.stringify({e}, null, "  "));
// });
export default router;
