"use strict";
const express_rate_limit_1 = require("express-rate-limit");
// middleware for limiting user requests
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 100, // per windowMs
});
module.exports = limiter;
