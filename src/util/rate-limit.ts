import { rateLimit, RateLimitRequestHandler } from "express-rate-limit"

// middleware for limiting user requests
const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, //15 min
  max: 100, // per windowMs
})

export = limiter
