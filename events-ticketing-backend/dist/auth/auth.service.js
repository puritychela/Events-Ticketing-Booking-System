"use strict";
//register a new user
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmailService = exports.createUserServices = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// Create user
const createUserServices = async (newUser) => {
    await db_1.default.insert(schema_1.user).values(newUser).returning();
    return "User Created successfully";
};
exports.createUserServices = createUserServices;
//get user by email
const getUserByEmailService = async (email) => {
    return await db_1.default.query.user.findFirst({
        where: ((0, drizzle_orm_1.eq)(schema_1.user.email, email))
    });
};
exports.getUserByEmailService = getUserByEmailService;
// export const generateResetToken = async (email: string): Promise<string> => {
//   const token = crypto.randomBytes(32).toString("hex");
//   const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry
//   await db.update(user)
//     .set({ resetToken: token, resetTokenExpiry: expiry })
//     .where(eq(user.email, email));
//   return token;
// };
