import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Extend Express request type to include "user"
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

type DecodedToken = {
  userId: number;
  email: string;
  role: string;
  firstname: string;
  lastname: string;
  exp: number;
};

// ✅ Verifies JWT token
export const verifyToken = (token: string, secret: string): DecodedToken | null => {
  try {
    const decoded = jwt.verify(token, secret) as DecodedToken;
    return decoded;
  } catch (error) {
    return null;
  }
};

// ✅ Middleware to check role access (admin/user/both)
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  requiredRole: "admin" | "user" | "both"
): void => {
  const authHeader = req.header("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Authorization header is missing or malformed" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const decodedToken = verifyToken(token, process.env.JWT_SECRET as string);

  if (!decodedToken) {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }

  const userRole = decodedToken.role;

  if (requiredRole === "both" || userRole === requiredRole) {
    req.user = decodedToken;
    next();
  } else {
    res.status(403).json({ error: "Forbidden: insufficient permissions" });
  }
};

// ✅ Role-specific wrappers to plug into your routes
export const adminRoleAuth = (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req, res, next, "admin");
};

export const userRoleAuth = (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req, res, next, "user");
};

export const authRoleAuth = (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req, res, next, "both");
};
