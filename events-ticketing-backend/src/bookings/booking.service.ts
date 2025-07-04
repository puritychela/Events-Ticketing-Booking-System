import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { booking, TBookingInsert, TBookingSelect} from "../drizzle/schema";

// Get all events
export const getAllBookingsService = async (): Promise<TBookingSelect[]> => {
  return await db.query.booking.findMany();
};

// Get event by ID
export const getBookingByIdService = async (id: number): Promise<TBookingInsert | undefined> => {
  return await db.query.booking.findFirst({
    where: eq(booking.bookingId, id),
    
  });
};

// Create new event
export const createBookingService = async (data: TBookingInsert): Promise<TBookingSelect[]> => {
  return await db.insert(booking).values(data).returning();
};

// Update event
export const updateBookingService = async (
  id: number,
  data: Partial<TBookingInsert>
): Promise<number> => {
  const updated = await db.update(booking)
    .set(data)
    .where(eq(booking.bookingId, id))
    .returning(); // returns an array of updated rows

  return updated.length; // return how many were updated
};

// Delete event
export const deleteBookingService = async (id: number): Promise<number> => {
  const deleted = await db.delete(booking)
    .where(eq(booking.bookingId, id))
    .returning(); // returns an array of deleted rows

  return deleted.length; // number of rows deleted
};
