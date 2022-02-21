"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loger(req, res, next) {
    const date = new Date().toLocaleString();
    console.log(`${date} :  "${req.url}" : requested by ${req.socket.remoteAddress}.`);
    next();
}
exports.default = loger;
