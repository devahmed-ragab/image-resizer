"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attributes = ["name", "width", "height"];
function quiryExists(req, res, next) {
    const quiryKeys = Object.keys(req.query);
    if (quiryKeys.length == 0) {
        res
            .status(200)
            .send('url should be like : "domainName:3000/api/images?name=ImageName&width=100&height=100"');
    }
    else {
        next();
    }
}
function lowerCase(req, res, next) {
    // convert res.query heys to lowerCase
    for (const attr in req.query) {
        const keyTemp = attr.toLowerCase();
        const valTemp = req.query[attr].toLowerCase();
        delete req.query[attr];
        req.query[keyTemp] = valTemp;
    }
    next();
}
function missingAttr(req, res, next) {
    // check for missing attributes
    const missingAttr = [];
    for (const attr of attributes) {
        if (!Object.prototype.hasOwnProperty.call(req.query, attr)) {
            missingAttr.push(attr);
        }
    }
    missingAttr.length > 0
        ? res.status(400).send(`missing attributes: ${missingAttr.toString()}.`)
        : next();
}
function missingValues(req, res, next) {
    // check for missing attributes
    const query = req.query;
    if (!(query.name && query.width && query.height)) {
        res.status(400).send(`some or all attributes' values are missing.`);
    }
    else {
        next();
    }
}
function parseNumbers(req, res, next) {
    const missingValues = [];
    const { width, height } = req.query;
    if (isNaN(parseInt(width)))
        missingValues.push("width");
    if (isNaN(parseInt(height)))
        missingValues.push("height");
    missingValues.length > 0
        ? res
            .status(400)
            .send(`values for "${missingValues.toString()}" must be numbers.`)
        : next();
}
exports.default = [
    quiryExists,
    lowerCase,
    missingAttr,
    missingValues,
    parseNumbers,
];
