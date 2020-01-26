import express from "express";
import convertHTMLToPDF from "./cH2Pdf";
import {readFileSync} from "fs";
import Ajv from "ajv";

const router = express.Router();

/* GET home page. */
router.get('/', function (req: any, res: any, next: any) {
    // res.render('index', {title: 'Express'});
    // res.json({some: "test eee"});

    let callback = function (pdf: any) {
        // do something with the PDF like send it as the response
        res.setHeader("Content-Type", "application/pdf");
        res.send(pdf);
    };

    var ajv = new Ajv({allErrors: true});

    var schema = {
        "properties": {
            "foo": {"type": "string"},
            "bar": {"type": "number", "maximum": 3}
        }
    };

    var validate = ajv.compile(schema);


    test({"foo": "abc", "bar": 2});
    test({"foo": 2, "bar": 4});

    function test(data: any) {
        var valid = validate(data);
        if (valid) console.log('Valid!');
        else console.log('Invalid: ' + ajv.errorsText(validate.errors));
    }


    let text = readFileSync("./public/xm.html", "utf-8");

    /**
     *    Usage
     *    @param html - This is the html to be converted to a pdf
     *    @param callback - Do something with the PDF
     *    @param [options] - Optional parameter to pass in Puppeteer PDF options
     *    @param [puppeteerArgs] - Optional parameter to pass in Puppeter arguments
     *    @param [remoteContent] - Default true. Optional parameter to specify if there is no remote content. Performance will be opitmized for no remote content.
     */
    let headerOption = {
        path: 'sample.pdf',
        landscape: false,
        displayHeaderFooter: true,
        headerTemplate: `<div 
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
</div>`,

        footerTemplate: `<div 
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
</div>`,
        margin: {
            top: '100px',
            bottom: '100px',
            right: '20px',
            left: '20px'
        }
    };

    let curTime = new Date();
    console.log(curTime);
    convertHTMLToPDF(text, callback, headerOption);
    let endTime = new Date();
    console.log(endTime);
    console.log(`Total time spent: ${+endTime - +curTime}`);
});

export default router;
