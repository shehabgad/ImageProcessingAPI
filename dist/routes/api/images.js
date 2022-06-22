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
const express_1 = __importDefault(require("express"));
const imageMiddleWares_1 = __importDefault(require("../../utilities/imageMiddleWares"));
const Image_1 = __importDefault(require("../../utilities/Image"));
const path_1 = __importDefault(require("path"));
const images = express_1.default.Router();
images.get('/', imageMiddleWares_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.query.fileName;
    let width = req.query.width;
    let height = req.query.height;
    const result = yield Image_1.default.resizeImageAndSave(fileName, width, height);
    if (result[0] == true) {
        const location = path_1.default.resolve("assets", `cachedImages/${fileName}_${width}_${height}.jpg`);
        res.status(200).sendFile(location);
    }
    else {
        res.status(400).send(result[1]);
    }
}));
exports.default = images;
