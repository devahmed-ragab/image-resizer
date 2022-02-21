"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const resizer_1 = __importDefault(require("../controllers/resizer"));
const resizer_2 = __importDefault(require("../middlewares/validators/resizer"));
const route = express_1.default.Router();
route.get("/images", resizer_2.default, resizer_1.default.resizer);
module.exports = route;
