"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const image_1 = __importDefault(require("../modules/image"));
const request = (0, supertest_1.default)(app_1.default);
describe("Resizer endPoint responses", () => {
    describe("endPoin validators:", () => {
        it("should not have missing attributes.", async () => {
            const response = await request.get("/api/images?=fjord&width=250&height=250");
            expect(response.status).toBe(400);
        });
        it("should not have missing values.", async () => {
            const response = await request.get("/api/images?name=&width=250&height=250");
            expect(response.status).toBe(400);
        });
        it("should have numbers is width and height values.", async () => {
            const response = await request.get("/api/images?name=fjord&width=mm&height=250");
            expect(response.status).toBe(400);
        });
    });
    describe("endPoin Processing:", function () {
        it("returns a correct response on a valid request", async () => {
            const response = await request.get("/api/images?name=fjord&width=250&height=250");
            expect(response.status).toBe(200);
        });
        it("returns a 404 error on an invalid image", async () => {
            const response = await request.get("/api/images?name=fjo999rd&width=250&height=250");
            expect(response.status).toBe(404);
        });
        afterAll(async () => {
            const img = new image_1.default("fjord", 250, 250);
            await fs_1.promises.rm(img.cachePath());
        });
    });
});
