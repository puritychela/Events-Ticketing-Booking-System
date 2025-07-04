import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { payment, TPaymentInsert, TPaymentSelect} from "../drizzle/schema";

// Get all events
export const getAllPaymentsService = async (): Promise<TPaymentSelect[]> => {
  return await db.query.payment.findMany();
};

// Get event by ID
export const getPaymentByIdService = async (id: number): Promise<TPaymentInsert | undefined> => {
  return await db.query.payment.findFirst({
    where: eq(payment.paymentId, id),
    
  });
};

// Create new event
export const createPaymentService = async (data: TPaymentInsert): Promise<TPaymentSelect[]> => {
  return await db.insert(payment).values(data).returning();
};

// Update event
export const updatePaymentService = async (
  id: number,
  data: Partial<TPaymentInsert>
): Promise<number> => {
  const updated = await db.update(payment)
    .set(data)
    .where(eq(payment.paymentId, id))
    .returning(); // returns an array of updated rows

  return updated.length; // return how many were updated
};

// Delete event
export const deletePaymentService = async (id: number): Promise<number> => {
  const deleted = await db.delete(payment)
    .where(eq(payment.bookingId, id))
    .returning(); // returns an array of deleted rows

  return deleted.length; // number of rows deleted
};