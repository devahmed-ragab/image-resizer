"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const directory_1 = require("./directory");
class Image {
    constructor(name, width, height) {
        this._extintion = ".jpg";
        this._width = width;
        this._height = height;
        this._name = name.toLowerCase();
        this._cacheName = `${this._name}${this._width}x${this._height}`;
    }
    originPath() {
        // return orginal Image full path with image extintion.
        return path_1.default.join(Image.originDir, this._name + this._extintion);
    }
    cachePath() {
        // return cahed (target) Image full path with image extintion.
        return path_1.default.join(Image.cacheDir, this._cacheName + this._extintion);
    }
    async cached() {
        // takes originPath() or cachePath() as parameter.
        try {
            await fs_1.promises.access(this.cachePath());
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async resize() {
        // resize and save image in cachePath().
        const orginalImgExists = await (0, directory_1.dirExists)(this.originPath());
        if (!orginalImgExists)
            throw new Error(`Iamge ${this._name} dose not exists.`);
        try {
            const img = (0, sharp_1.default)(this.originPath()).resize({
                width: this._width,
                height: this._height,
            });
            await img.toFile(this.cachePath());
            return this.cachePath();
        }
        catch (e) {
            throw new Error(`An error occurred could't resize the iamge ${this._name}.`);
        }
    }
}
Image.mainDir = path_1.default.resolve("public");
Image.originDir = path_1.default.join(Image.mainDir, "full");
Image.cacheDir = path_1.default.join(Image.mainDir, "thumb");
exports.default = Image;
