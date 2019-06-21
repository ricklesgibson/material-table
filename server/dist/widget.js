"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const model_1 = require("./model");
exports.router = express_1.Router();
exports.router.get('/widget', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getWidgetRepository();
            const allWidgets = yield repository.find();
            res.send(allWidgets);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/widget/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getWidgetRepository();
            const widget = yield repository.find({ id: req.params.id });
            res.send(widget);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/widget', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getWidgetRepository();
            const widget = new model_1.Widget();
            widget.title = req.body.title;
            widget.description = req.body.description;
            widget.date = req.body.date;
            widget.price = Number.parseFloat(req.body.price);
            const result = yield repository.save(widget);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/widget/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getWidgetRepository();
            const widget = yield repository.findOne({ id: req.params.id });
            widget.title = req.body.title;
            widget.description = req.body.description;
            widget.date = req.body.date;
            widget.price = Number.parseFloat(req.body.price);
            const result = yield repository.save(widget);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.delete('/widget/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getWidgetRepository();
            yield repository.delete({ id: req.params.id });
            res.send('OK');
        }
        catch (err) {
            return next(err);
        }
    });
});
