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
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
let imageExists = (directory, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myFile = yield fs_1.promises.readFile(`assets/${directory}/${fileName}.jpg`);
    }
    catch (err) {
        return false;
    }
    return true;
});
imageExists("images", "palmtunnel2");
let resizeImageAndSave = (fileName, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = yield (0, sharp_1.default)(`assets/images/${fileName}.jpg`);
        const resizedImage = yield image.resize({
            width: width,
            height: height
        });
        yield resizedImage.toFile(`assets/cachedImages/${fileName}_${width}_${height}.jpg`);
        return [true, "success"];
    }
    catch (err) {
        const errStr = err.message;
        return [false, errStr];
    }
});
resizeImageAndSave("santamonica", -1, 15).then((data) => console.log(data));
exports.default = {
    imageExists,
    resizeImageAndSave
};
