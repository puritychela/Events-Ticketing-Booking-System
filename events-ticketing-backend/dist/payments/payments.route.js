"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payments_controller_1 = require("./payments.controller");
const paymentRouter = (0, express_1.Router)();
// Base path: /api/payments
paymentRouter.get("/", payments_controller_1.getPayments);
paymentRouter.get("/:id", payments_controller_1.getPaymentById);
paymentRouter.post("/", payments_controller_1.createPayment);
paymentRouter.put("/:id", payments_controller_1.updatePayment);
paymentRouter.delete("/:id", payments_controller_1.deletePayment);
exports.default = paymentRouter;
