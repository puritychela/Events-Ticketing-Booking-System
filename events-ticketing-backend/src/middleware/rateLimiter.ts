import { RateLimiterMemory } from "rate-limiter-flexible";
import { Request, Response, NextFunction } from "express";

// Define rate limiter
const rateLimiter = new RateLimiterMemory({
  points: 10,   // Number of requests
  duration: 60  // Per 60 seconds
});

// Middleware function
export const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await rateLimiter.consume(req.ip || "unknown");
    console.log(`✅ Rate limit check passed for IP: ${req.ip}`);
    next();
  } catch (error) {
    res.status(429).json({ error: "Too many requests, please try again later." });
  }
};
