"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const image_1 = __importDefault(require("../modules/image"));
const directory_1 = require("../modules/directory");
// check check if target dir exist
// if not create it.
// check if image is there already.
// of not resizr it.
async function resizer(req, res) {
    const { name, width, height } = req.query;
    const cacheDirExists = await (0, directory_1.dirExists)(image_1.default.cacheDir);
    const image = new image_1.default(String(name), Number(width), Number(height));
    try {
        if (!cacheDirExists) {
            await (0, directory_1.createbDir)(image_1.default.cacheDir);
        }
        if (await image.cached()) {
            res.status(200).sendFile(image.cachePath());
        }
        else {
            const resizedImage = await image.resize();
            res.status(200).sendFile(resizedImage);
        }
    }
    catch (e) {
        const error = e;
        res.status(404).send(error.message);
    }
}
module.exports = { resizer };
