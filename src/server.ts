import express from "express";
import path from 'path';
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import compression from "compression";

const app = express();

app.use(logger('dev'));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true, limit: "50mb"}));
app.use(cookieParser());
app.use(compression());
app.use(express.static('public'));

app.use('/', indexRouter);

process
    .on('unhandledRejection', (reason, p) => {
        console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
        // application specific logging, throwing an error, or other logic here
    });

app
    .use(function (err: any, req: any, res: any, next: any) {
        res
            .status(400)
            .json({
                errorMsg: err.message
            });
    });


app.listen(3000);

