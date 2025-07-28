"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoleAuth = exports.userRoleAuth = exports.adminRoleAuth = exports.authMiddleware = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// ✅ Token verification helper
const verifyToken = (token, secret) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        console.log("🔑 Token successfully verified:", decoded);
        return decoded;
    }
    catch (error) {
        console.error("❌ Token verification failed:", error);
        return null;
    }
};
exports.verifyToken = verifyToken;
// ✅ Centralized role-based auth middleware
const authMiddleware = (req, res, next, requiredRole) => {
    const authHeader = req.header("authorization");
    console.log("📥 Incoming Authorization header:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.warn("🔒 No or malformed Authorization header");
        res
            .status(401)
            .json({ error: "Authorization header is missing or malformed" });
        return;
    }
    const token = authHeader.split(" ")[1];
    console.log("🔓 Extracted token:", token);
    const decodedToken = (0, exports.verifyToken)(token, process.env.JWT_SECRET);
    if (!decodedToken) {
        console.warn("🔒 Invalid or expired token");
        res.status(401).json({ error: "Invalid or expired token" });
        return;
    }
    console.log("✅ Authenticated user:", {
        userId: decodedToken.userId,
        email: decodedToken.email,
        role: decodedToken.role,
    });
    const userRole = decodedToken.role;
    console.log(`🛂 Required role: ${requiredRole}, User role: ${userRole}`);
    // Role check
    if (requiredRole === "both" || userRole === requiredRole) {
        req.user = decodedToken;
        console.log("✅ Role authorized – proceeding to next middleware.");
        return next();
    }
    console.warn("⛔ Forbidden: insufficient permissions");
    res.status(403).json({ error: "Forbidden: insufficient permissions" });
};
exports.authMiddleware = authMiddleware;
// ✅ Role-specific middleware wrappers
const adminRoleAuth = (req, res, next) => {
    console.log("🔐 Checking admin role...");
    (0, exports.authMiddleware)(req, res, next, "admin");
};
exports.adminRoleAuth = adminRoleAuth;
const userRoleAuth = (req, res, next) => {
    console.log("🔐 Checking user role...");
    (0, exports.authMiddleware)(req, res, next, "user");
};
exports.userRoleAuth = userRoleAuth;
const authRoleAuth = (req, res, next) => {
    console.log("🔐 Checking for user or admin role...");
    (0, exports.authMiddleware)(req, res, next, "both");
};
exports.authRoleAuth = authRoleAuth;
