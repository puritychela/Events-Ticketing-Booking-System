"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfilePicture = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const user_service_1 = require("./user.service");
const users_validator_1 = require("../validators/users.validator");
// GET all users
const getUsers = async (req, res, next) => {
    try {
        const allUsers = await (0, user_service_1.getUsersServices)();
        if (!allUsers || allUsers.length === 0) {
            res.status(404).json({ message: "No users found" });
            return;
        }
        res.status(200).json(allUsers);
        return;
    }
    catch (error) {
        return next(error);
    }
};
exports.getUsers = getUsers;
// GET user by ID
const getUserById = async (req, res, next) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
    }
    try {
        const user = await (0, user_service_1.getUserByIdServices)(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
        return;
    }
    catch (error) {
        return next(error);
    }
};
exports.getUserById = getUserById;
// CREATE user
const createUser = async (req, res, next) => {
    const { firstname, lastname, email, password, contactPhone, address, role } = req.body;
    if (!firstname || !lastname || !email || !password) {
        res.status(400).json({ error: "Firstname, lastname, email, and password are required" });
        return;
    }
    try {
        const newUser = await (0, user_service_1.createUserServices)({
            firstname,
            lastname,
            email,
            password,
            contactPhone,
            address,
            role: role || "user",
        });
        if (!newUser) {
            res.status(500).json({ message: "Failed to create user" });
            return;
        }
        res.status(201).json(newUser);
        return;
    }
    catch (error) {
        return next(error);
    }
};
exports.createUser = createUser;
// UPDATE user (partial)
const updateUser = async (req, res, next) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
    }
    try {
        const cleanedData = Object.fromEntries(Object.entries(req.body).filter(([_, value]) => value !== undefined && value !== null));
        const parsedResult = users_validator_1.userUpdateSchema.safeParse(cleanedData);
        if (!parsedResult.success) {
            res.status(400).json({
                message: "Validation failed",
                errors: parsedResult.error.errors.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                })),
            });
            return;
        }
        const validatedData = parsedResult.data;
        const updatedUser = await (0, user_service_1.updateUserServices)(userId, validatedData);
        if (!updatedUser) {
            res.status(404).json({ message: "User not found or failed to update" });
            return;
        }
        res.status(200).json(updatedUser);
        return;
    }
    catch (error) {
        return next(error);
    }
};
exports.updateUser = updateUser;
// DELETE user
const deleteUser = async (req, res, next) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
    }
    try {
        const deletedUser = await (0, user_service_1.deleteUserServices)(userId);
        if (!deletedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted successfully" });
        return;
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteUser = deleteUser;
// Update profile picture
const updateProfilePicture = async (req, res, next) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
    }
    const { profileUrl } = req.body;
    if (!profileUrl) {
        res.status(400).json({ error: "profileUrl is required" });
        return;
    }
    try {
        const updatedUser = await (0, user_service_1.updateUserServices)(userId, {
            profilepicture: profileUrl,
        });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found or failed to update profile picture" });
            return;
        }
        res.status(200).json({ message: "Profile picture updated", user: updatedUser });
        return;
    }
    catch (error) {
        return next(error);
    }
};
exports.updateProfilePicture = updateProfilePicture;
