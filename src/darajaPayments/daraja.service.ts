// src/services/darajaService.ts
import axios from "axios";
import dotenv from "dotenv";
import {
  payment,
  TPaymentInsert,
  TPaymentSelect,
} from "../drizzle/schema"

dotenv.config();

const {
  DARAJA_CONSUMER_KEY,
  DARAJA_CONSUMER_SECRET,
  DARAJA_SHORT_CODE,
  DARAJA_PASSKEY,
  DARAJA_CALLBACK_URL,
} = process.env;

if (
  !DARAJA_CONSUMER_KEY ||
  !DARAJA_CONSUMER_SECRET ||
  !DARAJA_SHORT_CODE ||
  !DARAJA_PASSKEY ||
  !DARAJA_CALLBACK_URL
) {
  throw new Error("🚨 Missing required Daraja environment variables");
}

// 1. Generate access token
export const getAccessToken = async (): Promise<string> => {
  const credentials = `${DARAJA_CONSUMER_KEY}:${DARAJA_CONSUMER_SECRET}`;
  const encodedCredentials = Buffer.from(credentials).toString("base64");

  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      }
    );

    const token = response.data.access_token;
    if (!token) throw new Error("No token received from Daraja");

    console.log("✅ Access Token Received:", token);
    return token;
  } catch (error: any) {
    console.error("❌ Failed to get access token:", error.response?.data || error.message);
    throw new Error("Failed to get Daraja access token");
  }
};

// 2. Initiate STK Push
export const initiateSTKPush = async (phone: string, amount: number) => {
  const accessToken = await getAccessToken();

  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .slice(0, 14); // YYYYMMDDHHMMSS

  const password = Buffer.from(
    `${DARAJA_SHORT_CODE}${DARAJA_PASSKEY}${timestamp}`
  ).toString("base64");

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
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ STK Push Initiated Successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ STK Push Failed:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.errorMessage || "Daraja STK push failed"
    );
  }
};
