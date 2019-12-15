"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cH2Pdf_1 = __importDefault(require("./cH2Pdf"));
const fs_1 = require("fs");
const router = express_1.default.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', {title: 'Express'});
    // res.json({some: "test eee"});
    var callback = function (pdf) {
        // do something with the PDF like send it as the response
        res.setHeader("Content-Type", "application/pdf");
        res.send(pdf);
    };
    let text = fs_1.readFileSync("./public/xm.html", "utf-8");
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
">人民医院门诊病历</div>`,
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
<span class="pageNumber"></span>/<span class="totalPages"></span> @ <span class="date"></span>
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
    cH2Pdf_1.default(text, callback, headerOption);
    let endTime = new Date();
    console.log(endTime);
    console.log(`Total time spent: ${+endTime - +curTime}`);
});
exports.default = router;
//# sourceMappingURL=index.js.map