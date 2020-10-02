"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
const compression_1 = __importDefault(require("compression"));
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookie_parser_1.default());
app.use(compression_1.default());
app.use(express_1.default.static('public'));
app.use('/', index_1.default);
process
    .on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});
app
    .use(function (err, req, res, next) {
    res
        .status(400)
        .json({
        errorMsg: err.message
    });
});
app.listen(3000);
//# sourceMappingURL=server.js.map