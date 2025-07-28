"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentService = exports.updatePaymentService = exports.createPaymentService = exports.getPaymentByIdService = exports.getAllPaymentsService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
/**
 * Initiates a Daraja STK Push and stores the payment record in the database.
 * @param phone - Customer's phone number (must start with 254)
 * @param amount - Payment amount
 * @param bookingId - Associated booking ID
 * @returns Object containing success message, payment info, and STK response
 */
/**
 * Retrieves all payment records from the database.
 * @returns List of payment records
 */
const getAllPaymentsService = async () => {
    return db_1.default.query.payment.findMany();
};
exports.getAllPaymentsService = getAllPaymentsService;
/**
 * Fetches a single payment by its ID.
 * @param id - Payment ID
 * @returns Payment record or undefined if not found
 */
const getPaymentByIdService = async (id) => {
    return db_1.default.query.payment.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.payment.paymentId, id),
    });
};
exports.getPaymentByIdService = getPaymentByIdService;
/**
 * Creates a new payment record manually (without Daraja STK push).
 * @param data - Payment payload
 * @returns Created payment record(s)
 */
const createPaymentService = async (data) => {
    return db_1.default.insert(schema_1.payment).values(data).returning();
};
exports.createPaymentService = createPaymentService;
/**
 * Updates an existing payment record.
 * @param id - Payment ID
 * @param data - Fields to update
 * @returns Number of updated records
 */
const updatePaymentService = async (id, data) => {
    const updated = await db_1.default
        .update(schema_1.payment)
        .set(data)
        .where((0, drizzle_orm_1.eq)(schema_1.payment.paymentId, id))
        .returning();
    return updated.length;
};
exports.updatePaymentService = updatePaymentService;
/**
 * Deletes a payment based on the booking ID.
 * @param bookingId - Booking ID tied to the payment
 * @returns Number of deleted records
 */
const deletePaymentService = async (bookingId) => {
    const deleted = await db_1.default
        .delete(schema_1.payment)
        .where((0, drizzle_orm_1.eq)(schema_1.payment.bookingId, bookingId))
        .returning();
    return deleted.length;
};
exports.deletePaymentService = deletePaymentService;
