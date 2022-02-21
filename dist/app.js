"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resizer_1 = __importDefault(require("./routes/resizer"));
const loger_1 = __importDefault(require("./middlewares/logs/loger"));
const rate_limit_1 = __importDefault(require("./util/rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const port = 3000;
const app = (0, express_1.default)();
app.use(rate_limit_1.default);
app.use(loger_1.default);
app.use((0, helmet_1.default)());
app.use("/api", resizer_1.default);
app.use("/", (req, res) => {
    res.status(301).redirect("/api/images");
});
app.listen(port, () => {
    console.log("server is working...");
});
exports.default = app;
