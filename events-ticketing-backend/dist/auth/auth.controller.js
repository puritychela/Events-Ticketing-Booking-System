"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_service_1 = require("./auth.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//register login
const createUser = async (req, res) => {
    try {
        const user = req.body;
        //console .log("🚀 ~ createUser ~ user:",user)
        if (!user.firstname || !user.lastname || !user.email || !user.password) {
            res.status(400).json({ error: "Firstname, lastname, email, and password are required" });
            return;
        }
        //generate hashed password 
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPassword = bcrypt_1.default.hashSync(user.password, salt);
        //   console.log("🚀~  createUser ~ hashedPassword:", hashedPassword )
        user.password = hashedPassword;
        const newUser = await (0, auth_service_1.createUserServices)(user);
        res.status(201).json({ message: newUser });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "failed to create user" });
    }
};
exports.createUser = createUser;
//logics for logins
const loginUser = async (req, res) => {
    const user = req.body;
    try {
        if (!user.email || !user.password) {
            res.status(400).json({ error: "Email and password are required" });
            return;
        }
        const existingUser = await (0, auth_service_1.getUserByEmailService)(user.email);
        if (!existingUser || !existingUser.password) {
            res.status(404).json({ error: "User not found or missing password" });
            return;
        }
        //if user is found now we compare now the password
        const isMatch = bcrypt_1.default.compareSync(user.password, existingUser.password);
        if (!isMatch) {
            res.status(401).json({ error: "Invalid password" });
            return;
        }
        //generate the token now
        let payload = {
            userId: existingUser.userId,
            email: existingUser.email,
            firstname: existingUser.firstname,
            lastname: existingUser.lastname,
            role: existingUser.role,
            //expiry payload token
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        };
        let secret = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign(payload, secret);
        res.status(200).json({ token, userId: existingUser.userId, email: existingUser.email, firstname: existingUser.firstname, lastname: existingUser.lastname, role: existingUser.role });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed To Login" });
    }
};
exports.loginUser = loginUser;
