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
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

app.use('/', indexRouter);

app.listen(3000);

