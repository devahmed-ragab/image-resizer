"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const directory_1 = require("../../modules/directory");
const fs_1 = require("fs");
describe("Directory Module", () => {
    const publicDirPath = path_1.default.resolve("public");
    describe("dirExists: Function", () => {
        it("should return true for exits directory.", async () => {
            expect(await (0, directory_1.dirExists)(publicDirPath)).toBeTrue();
        });
        it("should return false for unexits directory.", async () => {
            const path = publicDirPath + "unreal";
            expect(await (0, directory_1.dirExists)(path)).toBeFalse();
        });
    });
    describe("createbDir: Function", () => {
        const dirPath = path_1.default.join(publicDirPath, "testDir");
        it("should crate directory at given path.", async () => {
            let dirExistnce;
            await (0, directory_1.createbDir)(dirPath);
            try {
                await fs_1.promises.access(dirPath);
                dirExistnce = true;
            }
            catch (e) {
                dirExistnce = false;
            }
            expect(dirExistnce).toBeTrue();
        });
        afterAll(async () => {
            await fs_1.promises.rmdir(dirPath);
        });
    });
});
