"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createbDir = exports.dirExists = void 0;
const fs_1 = require("fs");
async function dirExists(path) {
    try {
        await fs_1.promises.stat(path);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.dirExists = dirExists;
async function createbDir(path) {
    try {
        fs_1.promises.mkdir(path);
    }
    catch (e) {
        throw new Error("could't create directory: " + path);
    }
}
exports.createbDir = createbDir;
