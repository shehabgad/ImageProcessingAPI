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
const Image_1 = __importDefault(require("../../utilities/Image"));
describe('Image utility functions test', () => {
    it('image exists in images directory', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Image_1.default.imageExists("images", "santamonica");
        expect(result).toBeTruthy();
    }));
    it('resized image exists in cachedImages directory', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Image_1.default.imageExists("cachedImages", "santamonica_800_750");
        expect(result).toBeTruthy();
    }));
});
