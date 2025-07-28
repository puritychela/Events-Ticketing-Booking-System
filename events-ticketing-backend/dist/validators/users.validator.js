"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.userUpdateSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
// Create User
exports.createUserSchema = zod_1.z.object({
    firstname: zod_1.z.string().min(3, "Firstname is required"),
    lastname: zod_1.z.string().min(3, "Lastname is required"),
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    contactPhone: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    role: zod_1.z.enum(["admin", "user"]).optional()
});
exports.userUpdateSchema = zod_1.z.object({
    firstname: zod_1.z.string().optional(),
    lastname: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(6).optional(),
    contactPhone: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    profilepicture: zod_1.z.string().url().optional(), // Make sure it's optional
});
// Login Schema
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(6, "Password is required")
});
