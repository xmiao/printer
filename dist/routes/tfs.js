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

/* GET users listing. */
function tfs(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // const url = `http://tfs2018-web.winning.com.cn:8080/tfs/WINNING-6.0/WiNEX-Inpatient/WiNEX-Inpatient%20%E5%9B%A2%E9%98%9F/`;
        const url = `http://tfs2018-web.winning.com.cn:8080/tfs/WINNING-6.0/WiNEX-Inpatient/WiNEX-Inpatient%20%E5%9B%A2%E9%98%9F/_queries?id=50139361-2b72-40e8-ac37-a2c75a12fa0d&_a=query`;
        const browser = yield puppeteer_1.default.launch({headless: false});
        const page = yield browser.newPage();
        yield page.authenticate({username: "mxj", password: "f8w*ad#7"});
        yield page.goto(url);
        yield page.waitForNavigation({waitUntil: 'networkidle2'});
        //await page.waitFor('input[id=haha]');
        // const browser = await puppeteer.launch({headless: false});
        // const page = await browser.newPage();
        // await page.setViewport({width: 1200, height: 720})
        // await page.goto('https://www.daum.net', { waitUntil: 'networkidle0' }); // wait until page load
        // await page.type('#id', CREDS.username);
        // await page.type('#loginPw', CREDS.password);
        // click and wait for navigation
        //     await Promise.all([
        //         page.click('#loginSubmit'),
        //         page.waitForNavigation({ waitUntil: 'networkidle0' }),
        //     ]);
        yield page.screenshot({path: 'screenshot.png'});
        browser.close();
        res.send('respond with a resource');
    });
}

exports.tfs = tfs;
//# sourceMappingURL=tfs.js.map
