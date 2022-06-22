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
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const Image_1 = __importDefault(require("../utilities/Image"));
const validReq = (req, res, next) => {
    const fileName = req.query.fileName;
    const width = req.query.width;
    const height = req.query.height;
    if (fileName === undefined || width === undefined || height === undefined) {
        res
            .status(400)
            .send('please provide the required queries in this form fileName, width, height');
        return;
    }
    else if (fileName === '' || width === '' || height === '') {
        res.status(400).send('dont send empty paramters');
        return;
    }
    try {
        parseInt(width);
        parseInt(height);
    }
    catch (err) {
        res.status(400).send('height and width must be numbers');
        return;
    }
    next();
};
const imageExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.query.fileName;
    const result = yield Image_1.default.imageExists('images', fileName);
    if (result == false) {
        res.status(404).send('image not found');
        return;
    }
    next();
});
const cachedImageExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.query.fileName;
    const width = req.query.width;
    const height = req.query.height;
    const result = yield Image_1.default.imageExists('cachedImages', `${fileName}_${width}_${height}`);
    if (result == true) {
        const location = path_1.default.resolve('assets', `cachedImages/${fileName}_${width}_${height}.jpg`);
        res.status(200).sendFile(location);
        console.log("A CACHED IMAGE");
        return;
    }
    next();
});
const imageMiddleWare = [validReq, imageExist, cachedImageExist];
exports.default = imageMiddleWare;
