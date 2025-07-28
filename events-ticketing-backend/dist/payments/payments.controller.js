"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.updatePayment = exports.createPayment = exports.getPaymentById = exports.getPayments = void 0;
const payments_service_1 = require("./payments.service");
// GET all payments
const getPayments = async (req, res, next) => {
    try {
        const payments = await (0, payments_service_1.getAllPaymentsService)();
        if (!payments || payments.length === 0) {
            res.status(404).json({ message: "No payments found" });
            return;
        }
        res.status(200).json(payments);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.getPayments = getPayments;
// GET payment by ID
const getPaymentById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid payment ID" });
        return;
    }
    try {
        const payment = await (0, payments_service_1.getPaymentByIdService)(id);
        if (!payment) {
            res.status(404).json({ message: "Payment not found" });
            return;
        }
        res.status(200).json(payment);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.getPaymentById = getPaymentById;
// CREATE payment
const createPayment = async (req, res, next) => {
    const { bookingId, amount, paymentStatus, paymentMethod, transactionId } = req.body;
    if (!bookingId || !amount || !paymentMethod || !transactionId) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    try {
        const newPayment = await (0, payments_service_1.createPaymentService)({
            bookingId,
            amount,
            paymentStatus,
            paymentMethod,
            transactionId,
        });
        res.status(201).json(newPayment);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.createPayment = createPayment;
// UPDATE payment
const updatePayment = async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid payment ID" });
        return;
    }
    try {
        const updatedCount = await (0, payments_service_1.updatePaymentService)(id, req.body);
        if (updatedCount === 0) {
            res.status(404).json({ message: "Payment not found" });
            return;
        }
        res.status(200).json({ message: "Payment updated successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.updatePayment = updatePayment;
// DELETE payment
const deletePayment = async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid payment ID" });
        return;
    }
    try {
        const deletedCount = await (0, payments_service_1.deletePaymentService)(id);
        if (deletedCount === 0) {
            res.status(404).json({ message: "Payment not found" });
            return;
        }
        res.status(200).json({ message: "Payment deleted successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.deletePayment = deletePayment;
