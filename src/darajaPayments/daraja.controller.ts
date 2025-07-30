import { Request, Response } from "express";
import { initiateSTKPush } from "../darajaPayments/daraja.service";
import { payment,ticket, booking } from "../drizzle/schema";
import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { confirmBookingService } from "../bookings/booking.service";

// Temporary in-memory mapping of CheckoutRequestID → bookingId
export const pendingPayments: Record<string, number> = {};

/**
 * Initiates Daraja STK Push and marks payment as Paid + booking Confirmed immediately.
 */
export const payForBooking = async (req: Request, res: Response) => {
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
    const result = await initiateSTKPush(formattedPhone, amount);
    const checkoutId = result.CheckoutRequestID;

    console.log("📨 STK Push initiated:", result);

    if (checkoutId) {
      pendingPayments[checkoutId] = bookingId;
      console.log("🧾 Stored pending payment:", { checkoutId, bookingId });

      // Insert payment as PAID immediately
      await db.insert(payment).values({
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
      await confirmBookingService(bookingId);
      console.log("✅ Booking confirmed after STK initiation:", bookingId);
    }
    const bookingDetails = await db
  .select()
  .from(booking)
  .where(eq(booking.bookingId, bookingId))
  .then(rows => rows[0]);

if (!bookingDetails) {
  console.error("❌ Booking not found when issuing ticket");
  res.status(404).json({ message: "Booking not found" });
  return;
}

// ✅ Create ticket entry
await db.insert(ticket).values({
  bookingId: bookingDetails.bookingId,
  userId: bookingDetails.userId,
  eventId: bookingDetails.eventId,
  qrCode: uuidv4(), // unique QR code
  seatNumber: "A1", // hardcoded for now, can be dynamic later
});
console.log("🎟️ Ticket created for user:", bookingDetails.userId);


    res.status(200).json({
      message: "STK push initiated successfully. Booking confirmed and payment recorded.",
      data: result,
    });
  } catch (err: any) {
    console.error("❌ STK Push Error:", err.response?.data || err.message);
    res.status(500).json({
      message: "Payment failed to initiate.",
      error: err.response?.data || err.message,
    });
  }
};

/**
 * Handles M-Pesa callback (still useful if you want to log or validate response).
 */
export const mpesaCallbackHandler = async (req: Request, res: Response) => {
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
    let amount: number | undefined;
    let receipt: string | undefined;
    let phoneNumber: string | undefined;

    if (CallbackMetadata?.Item) {
      for (const item of CallbackMetadata.Item) {
        if (item.Name === "Amount") amount = item.Value;
        if (item.Name === "MpesaReceiptNumber") receipt = item.Value;
        if (item.Name === "PhoneNumber") phoneNumber = item.Value?.toString();
      }
    }

    // Update payment record with actual receipt number if available
    if (receipt) {
      await db
        .update(payment)
        .set({
          transactionId: receipt,
          phone: phoneNumber || null,
          amount: amount?.toString() || undefined,
        })
        .where(eq(payment.transactionId, CheckoutRequestID));

      console.log("📝 Updated payment with M-Pesa receipt:", receipt);
    }

    // Clean up memory
    delete pendingPayments[CheckoutRequestID];
    console.log("🧹 Cleared pending payment for:", CheckoutRequestID);

    res.status(200).json({ message: "Callback received and updated successfully" });
  } catch (err: any) {
    console.error("❌ Callback Handler Error:", err.message);
    res.status(500).json({ message: "Failed to process callback" });
  }
};
