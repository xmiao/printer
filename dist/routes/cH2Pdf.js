"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const puppeteer_1 = __importDefault(require("puppeteer"));
let browser = null;
let page = null;
let convertHTMLToPDF = (html, options, puppeteerArgs, remoteContent) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof html !== 'string') {
        throw new Error('Invalid Argument: HTML expected as type of string and received a value of a different type. Check your request body and request headers.');
    }
    if (!browser) {
        if (puppeteerArgs) {
            browser = yield puppeteer_1.default.launch(puppeteerArgs);
        } else {
            browser = yield puppeteer_1.default.launch();
        }
        page = yield browser.newPage();
    }
    if (!options) {
        options = {format: 'Letter'};
    }
    if (remoteContent === true) {
        yield page.goto(`data:text/html;base64,${Buffer.from(html).toString('base64')}`, {
            waitUntil: 'networkidle0'
        });
    } else {
        yield page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
        //page.setContent will be faster than page.goto if html is a static
        yield page.setContent(html);
    }
    let curTime = new Date();
    console.log(curTime);
    let pdf = yield page.pdf(options);
    let endTime = new Date();
    console.log(endTime);
    console.log(`Generating PDF: ${+endTime - +curTime}`);
    // await browser.close();
    return pdf;
});
exports.default = convertHTMLToPDF;
//# sourceMappingURL=cH2Pdf.js.map
