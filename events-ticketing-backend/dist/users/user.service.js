"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserServices = exports.updateUserProfileService = exports.updateUserServices = exports.createUserServices = exports.getUserByIdServices = exports.getUsersServices = void 0;
// src/users/user.service.ts
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// Get all users
const getUsersServices = async () => {
    return await db_1.default.query.user.findMany();
};
exports.getUsersServices = getUsersServices;
// Get user by ID
const getUserByIdServices = async (userId) => {
    return await db_1.default.query.user.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.user.userId, userId),
    });
};
exports.getUserByIdServices = getUserByIdServices;
// Create user
const createUserServices = async (newUser) => {
    await db_1.default.insert(schema_1.user).values(newUser).returning();
    return "User created successfully";
};
exports.createUserServices = createUserServices;
// Update user (Admin use)
const updateUserServices = async (userId, updatedUser) => {
    const [updated] = await db_1.default
        .update(schema_1.user)
        .set(updatedUser)
        .where((0, drizzle_orm_1.eq)(schema_1.user.userId, userId))
        .returning();
    return updated;
};
exports.updateUserServices = updateUserServices;
// Update user profile (User self-service)
const updateUserProfileService = async (userId, profileData) => {
    const [updated] = await db_1.default
        .update(schema_1.user)
        .set(profileData)
        .where((0, drizzle_orm_1.eq)(schema_1.user.userId, userId))
        .returning();
    return updated;
};
exports.updateUserProfileService = updateUserProfileService;
// Delete user
const deleteUserServices = async (userId) => {
    const [deleted] = await db_1.default
        .delete(schema_1.user)
        .where((0, drizzle_orm_1.eq)(schema_1.user.userId, userId))
        .returning();
    return deleted;
};
exports.deleteUserServices = deleteUserServices;
