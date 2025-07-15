import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { booking, event, TBookingInsert, TBookingSelect } from "../drizzle/schema";

// ✅ Get all bookings (optionally filtered by userId)
export const getAllBookingsService = async (
  filter?: { userId?: string }
): Promise<TBookingSelect[]> => {
  if (filter?.userId) {
    return await db.query.booking.findMany({
      where: eq(booking.userId, Number(filter.userId)), // ✅ Fix here
      with: {
        event: true,
      },
    });
  }

  return await db.query.booking.findMany({
    with: {
      event: true,
      user: true,
    },
  });
};


// ✅ Get a single booking by ID
export const getBookingByIdService = async (id: number): Promise<TBookingSelect | undefined> => {
  return await db.query.booking.findFirst({
    where: eq(booking.bookingId, id),
    with: {
      event: true,
      user: true, // if needed in frontend
    },
  });
};

// ✅ Create a new booking (return the created row)
export const createBookingService = async (
  data: TBookingInsert
): Promise<TBookingSelect> => {
  const created = await db.insert(booking).values(data).returning();
  return created[0]; // return single booking
};

// ✅ Update booking
export const updateBookingService = async (
  id: number,
  data: Partial<TBookingInsert>
): Promise<number> => {
  const updated = await db.update(booking)
    .set(data)
    .where(eq(booking.bookingId, id))
    .returning();

  return updated.length;
};

// ✅ Delete booking
export const deleteBookingService = async (id: number): Promise<number> => {
  const deleted = await db.delete(booking)
    .where(eq(booking.bookingId, id))
    .returning();

  return deleted.length;
};
