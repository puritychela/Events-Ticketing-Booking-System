"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initiateSTKPush = exports.getAccessToken = void 0;
// src/services/darajaService.ts
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DARAJA_CONSUMER_KEY, DARAJA_CONSUMER_SECRET, DARAJA_SHORT_CODE, DARAJA_PASSKEY, DARAJA_CALLBACK_URL, } = process.env;
if (!DARAJA_CONSUMER_KEY ||
    !DARAJA_CONSUMER_SECRET ||
    !DARAJA_SHORT_CODE ||
    !DARAJA_PASSKEY ||
    !DARAJA_CALLBACK_URL) {
    throw new Error("🚨 Missing required Daraja environment variables");
}
// 1. Generate access token
const getAccessToken = async () => {
    const credentials = `${DARAJA_CONSUMER_KEY}:${DARAJA_CONSUMER_SECRET}`;
    const encodedCredentials = Buffer.from(credentials).toString("base64");
    try {
        const response = await axios_1.default.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
            headers: {
                Authorization: `Basic ${encodedCredentials}`,
            },
        });
        const token = response.data.access_token;
        if (!token)
            throw new Error("No token received from Daraja");
        console.log("✅ Access Token Received:", token);
        return token;
    }
    catch (error) {
        console.error("❌ Failed to get access token:", error.response?.data || error.message);
        throw new Error("Failed to get Daraja access token");
    }
};
exports.getAccessToken = getAccessToken;
// 2. Initiate STK Push
const initiateSTKPush = async (phone, amount) => {
    const accessToken = await (0, exports.getAccessToken)();
    const timestamp = new Date()
        .toISOString()
        .replace(/[-T:.Z]/g, "")
        .slice(0, 14); // YYYYMMDDHHMMSS
    const password = Buffer.from(`${DARAJA_SHORT_CODE}${DARAJA_PASSKEY}${timestamp}`).toString("base64");
    const formattedPhone = phone.startsWith("254")
        ? phone
        : phone.replace(/^0/, "254");
    const payload = {
        BusinessShortCode: DARAJA_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: DARAJA_SHORT_CODE,
        PhoneNumber: formattedPhone,
        CallBackURL: DARAJA_CALLBACK_URL,
        AccountReference: "BookingSystem",
        TransactionDesc: "Event Booking Payment",
    };
    try {
        const response = await axios_1.default.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        console.log("✅ STK Push Initiated Successfully:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("❌ STK Push Failed:", error.response?.data || error.message);
        throw new Error(error.response?.data?.errorMessage || "Daraja STK push failed");
    }
};
exports.initiateSTKPush = initiateSTKPush;
