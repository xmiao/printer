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
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = __importDefault(require("express"));
const cH2Pdf_1 = __importDefault(require("./cH2Pdf"));
const fs_1 = require("fs");
// import printer from "node-printer";
// let {printer} = require("node-printer");
// import {} from "node-printer";
const router = express_1.default.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
        let text = fs_1.readFileSync("./public/xm.html", "utf-8");
        let headerOption = {
            path: 'optionally-saved.pdf',
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
        let pdf = yield cH2Pdf_1.default(text, headerOption);
        let endTime = new Date();
        console.log(endTime);
        console.log(`Total time spent: ${+endTime - +curTime}`);
        res.setHeader("Content-Type", "application/pdf");
        res.send(pdf);
    });
});
router.get('/a', function (req, res, next) {
    // let printer = new Printer();
    // console.log(printer);
    // let a = printer.getPrinters();
    // console.log(a);
});
exports.default = router;
//# sourceMappingURL=index.js.map
