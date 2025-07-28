"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.post('/auth/register', auth_controller_1.createUser);
authRouter.post('/auth/login', auth_controller_1.loginUser);
exports.default = authRouter;
