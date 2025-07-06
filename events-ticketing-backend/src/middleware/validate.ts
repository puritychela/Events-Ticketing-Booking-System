import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body); // Throws if validation fails
    next();
  } catch (error: any) {
    return res.status(400).json({ error: error.errors || "Invalid request" });
  }
};
