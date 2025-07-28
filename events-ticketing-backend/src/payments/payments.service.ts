import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import {
  payment,
  TPaymentInsert,
  TPaymentSelect,
} from "../drizzle/schema";


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
export const getAllPaymentsService = async (): Promise<TPaymentSelect[]> => {
  return db.query.payment.findMany();
};

/**
 * Fetches a single payment by its ID.
 * @param id - Payment ID
 * @returns Payment record or undefined if not found
 */
export const getPaymentByIdService = async (
  id: number
): Promise<TPaymentSelect | undefined> => {
  return db.query.payment.findFirst({
    where: eq(payment.paymentId, id),
  });
};

/**
 * Creates a new payment record manually (without Daraja STK push).
 * @param data - Payment payload
 * @returns Created payment record(s)
 */
export const createPaymentService = async (
  data: TPaymentInsert
): Promise<TPaymentSelect[]> => {
  return db.insert(payment).values(data).returning();
};

/**
 * Updates an existing payment record.
 * @param id - Payment ID
 * @param data - Fields to update
 * @returns Number of updated records
 */
export const updatePaymentService = async (
  id: number,
  data: Partial<TPaymentInsert>
): Promise<number> => {
  const updated = await db
    .update(payment)
    .set(data)
    .where(eq(payment.paymentId, id))
    .returning();

  return updated.length;
};

/**
 * Deletes a payment based on the booking ID.
 * @param bookingId - Booking ID tied to the payment
 * @returns Number of deleted records
 */
export const deletePaymentService = async (
  bookingId: number
): Promise<number> => {
  const deleted = await db
    .delete(payment)
    .where(eq(payment.bookingId, bookingId))
    .returning();

  return deleted.length;
};
