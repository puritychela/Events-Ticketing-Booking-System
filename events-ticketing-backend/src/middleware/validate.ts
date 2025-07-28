// src/middleware/validate.ts

import { Request, Response, NextFunction, RequestHandler } from "express";
import { AnyZodObject } from "zod";

export const validate = (schema: AnyZodObject): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next(); // ✅ Input is valid
    } catch (error: any) {
      res.status(400).json({
        message: "Validation failed",
        errors: error.errors || "Invalid request",
      });

      return;
    }
  };
};
