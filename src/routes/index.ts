import express from "express";
import convertHTMLToPDF from "./cH2Pdf";
import {readFileSync} from "fs";
// import printer from "node-printer";
// let {printer} = require("node-printer");
// import {} from "node-printer";

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
    // let callback = function (pdf: any) {
    //     res.setHeader("Content-Type", "application/pdf");
    //     res.send(pdf);
    // };

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
    console.log(curTime);
    let pdf = await convertHTMLToPDF(text, headerOption);
    let endTime = new Date();
    console.log(endTime);
    console.log(`Total time spent: ${+endTime - +curTime}`);

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdf);
});

router.get('/a', function (req: any, res: any, next: any) {
    // let printer = new Printer();
    // console.log(printer);
    // let a = printer.getPrinters();
    // console.log(a);
});

export default router;
