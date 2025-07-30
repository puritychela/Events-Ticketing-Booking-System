import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { roleEnum } from "../drizzle/schema";

dotenv.config();

// Extend Express request type to include user from token
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

// Shape of the decoded JWT token
type DecodedToken = {
  userId: number;
  email: string;
  role: "user" | "admin";
  firstname: string;
  lastname: string;
  exp: number;
};

// ✅ Token verification helper
export const verifyToken = (
  token: string,
  secret: string
): DecodedToken | null => {
  try {
    const decoded = jwt.verify(token, secret) as DecodedToken;
    // console.log("🔑 Token successfully verified:", decoded);
    return decoded;
  } catch (error) {
    console.error("❌ Token verification failed:", error);
    return null;
  }
};

// ✅ Centralized role-based auth middleware
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  requiredRole: "admin" | "user" | "both"
): void => {
  const authHeader = req.header("authorization");

  // console.log("📥 Incoming Authorization header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("🔒 No or malformed Authorization header");
    res
      .status(401)
      .json({ error: "Authorization header is missing or malformed" });
    return;
  }

  const token = authHeader.split(" ")[1];
  // console.log("🔓 Extracted token:", token);

  const decodedToken = verifyToken(token, process.env.JWT_SECRET as string);

  if (!decodedToken) {
    console.warn("🔒 Invalid or expired token");
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }

  // console.log("✅ Authenticated user:", {
  //   userId: decodedToken.userId,
  //   email: decodedToken.email,
  //   role: decodedToken.role,
  // });

  const userRole = decodedToken.role;

  // console.log(`🛂 Required role: ${requiredRole}, User role: ${userRole}`);

  // Role check
    if (
    requiredRole === "both" ||
    (requiredRole === "admin" && userRole === "admin") ||
    (requiredRole === "user" && userRole === "user")
  ) {
    req.user = decodedToken;
    // console.log("✅ Role authorized – proceeding to next middleware.");
    return next();
  }

  console.warn("⛔ Forbidden: insufficient permissions");
  res.status(403).json({ error: "Forbidden: insufficient permissions" });
};

// ✅ Role-specific middleware wrappers
export const adminRoleAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("🔐 Checking admin role...");
  authMiddleware(req, res, next, "admin");
};

export const userRoleAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("🔐 Checking user role...");
  authMiddleware(req, res, next, "user");
};

export const authRoleAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("🔐 Checking for user or admin role...");
  authMiddleware(req, res, next, "both");
};


