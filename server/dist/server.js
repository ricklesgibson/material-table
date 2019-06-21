"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const widget_1 = require("./widget");
const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(widget_1.router);
app.listen(4201, (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log('My Node App listening on port 4201');
});
