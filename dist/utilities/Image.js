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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const imageExists = (directory, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const location = path_1.default.resolve('assets', `${directory}/${fileName}.jpg`);
    if (fs_1.default.existsSync(location))
        return true;
    else
        return false;
});
const resizeImageAndSave = (fileName, widthStr, heightStr) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const width = +widthStr;
        const height = +heightStr;
        const location = path_1.default.resolve('assets', `images/${fileName}.jpg`);
        const image = yield (0, sharp_1.default)(location);
        const resizedImage = yield image.resize(width, height);
        const location2 = path_1.default.resolve('assets', `cachedImages/${fileName}_${width}_${height}.jpg`);
        yield resizedImage.toFile(location2);
        return [true, 'success'];
    }
    catch (err) {
        const errStr = err.message;
        return [false, errStr];
    }
});
exports.default = {
    imageExists,
    resizeImageAndSave,
};
