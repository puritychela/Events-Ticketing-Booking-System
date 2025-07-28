"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mpesaCallbackHandler = exports.payForBooking = exports.pendingPayments = void 0;
const daraja_service_1 = require("../darajaPayments/daraja.service");
const schema_1 = require("../drizzle/schema");
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const booking_service_1 = require("../bookings/booking.service");
// Temporary in-memory mapping of CheckoutRequestID → bookingId
exports.pendingPayments = {};
/**
 * Initiates Daraja STK Push and marks payment as Paid + booking Confirmed immediately.
 */
const payForBooking = async (req, res) => {
    const { phone, amount, bookingId } = req.body;
    console.log("🔔 Payment request received:", { phone, amount, bookingId });
    if (!phone || !amount || !bookingId) {
        console.warn("⚠️ Missing phone, amount, or bookingId");
        res.status(400).json({
            message: "Phone, amount and bookingId are required.",
        });
        return;
    }
    const formattedPhone = phone.startsWith("254")
        ? phone
        : phone.replace(/^0/, "254");
    console.log("📞 Formatted phone:", formattedPhone);
    try {
        const result = await (0, daraja_service_1.initiateSTKPush)(formattedPhone, amount);
        const checkoutId = result.CheckoutRequestID;
        console.log("📨 STK Push initiated:", result);
        if (checkoutId) {
            exports.pendingPayments[checkoutId] = bookingId;
            console.log("🧾 Stored pending payment:", { checkoutId, bookingId });
            // Insert payment as PAID immediately
            await db_1.default.insert(schema_1.payment).values({
                bookingId,
                phone: formattedPhone,
                amount: amount.toString(),
                transactionId: checkoutId,
                paymentStatus: "Paid", // ✅ Inserted as Paid
                paymentMethod: "M-pesa",
                paymentDate: new Date(),
            });
            console.log("✅ Payment inserted with status Paid for booking:", bookingId);
            // Confirm booking immediately
            await (0, booking_service_1.confirmBookingService)(bookingId);
            console.log("✅ Booking confirmed after STK initiation:", bookingId);
        }
        res.status(200).json({
            message: "STK push initiated successfully. Booking confirmed and payment recorded.",
            data: result,
        });
    }
    catch (err) {
        console.error("❌ STK Push Error:", err.response?.data || err.message);
        res.status(500).json({
            message: "Payment failed to initiate.",
            error: err.response?.data || err.message,
        });
    }
};
exports.payForBooking = payForBooking;
/**
 * Handles M-Pesa callback (still useful if you want to log or validate response).
 */
const mpesaCallbackHandler = async (req, res) => {
    console.log("📥 Callback received from M-Pesa:", JSON.stringify(req.body, null, 2));
    try {
        const stkCallback = req.body.Body?.stkCallback;
        if (!stkCallback) {
            console.warn("⚠️ Invalid callback format");
            res.status(400).json({ message: "Invalid callback format" });
            return;
        }
        const { CheckoutRequestID, ResultCode, CallbackMetadata } = stkCallback;
        console.log("🔎 STK Callback:", { CheckoutRequestID, ResultCode });
        // Ignore failures (we already marked payment as Paid)
        if (ResultCode !== 0) {
            console.warn("❌ Payment failed or was cancelled.");
            res.status(200).json({ message: "Payment not successful" });
            return;
        }
        // Optionally update payment details with MpesaReceiptNumber and actual phone
        let amount;
        let receipt;
        let phoneNumber;
        if (CallbackMetadata?.Item) {
            for (const item of CallbackMetadata.Item) {
                if (item.Name === "Amount")
                    amount = item.Value;
                if (item.Name === "MpesaReceiptNumber")
                    receipt = item.Value;
                if (item.Name === "PhoneNumber")
                    phoneNumber = item.Value?.toString();
            }
        }
        // Update payment record with actual receipt number if available
        if (receipt) {
            await db_1.default
                .update(schema_1.payment)
                .set({
                transactionId: receipt,
                phone: phoneNumber || null,
                amount: amount?.toString() || undefined,
            })
                .where((0, drizzle_orm_1.eq)(schema_1.payment.transactionId, CheckoutRequestID));
            console.log("📝 Updated payment with M-Pesa receipt:", receipt);
        }
        // Clean up memory
        delete exports.pendingPayments[CheckoutRequestID];
        console.log("🧹 Cleared pending payment for:", CheckoutRequestID);
        res.status(200).json({ message: "Callback received and updated successfully" });
    }
    catch (err) {
        console.error("❌ Callback Handler Error:", err.message);
        res.status(500).json({ message: "Failed to process callback" });
    }
};
exports.mpesaCallbackHandler = mpesaCallbackHandler;
