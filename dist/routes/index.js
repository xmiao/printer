"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = __importDefault(require("express"));
const pdf_puppeteer_1 = __importDefault(require("pdf-puppeteer"));
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
    /**
     *    Usage
     *    @param html - This is the html to be converted to a pdf
     *    @param callback - Do something with the PDF
     *    @param [options] - Optional parameter to pass in Puppeteer PDF options
     *    @param [puppeteerArgs] - Optional parameter to pass in Puppeter arguments
     *    @param [remoteContent] - Default true. Optional parameter to specify if there is no remote content. Performance will be opitmized for no remote content.
     */
    pdf_puppeteer_1.default("<html>ok</html>", callback);
});
exports.default = router;
//# sourceMappingURL=index.js.map
