import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import {
  booking,
  event,
  TBookingInsert,
  TBookingSelect,
} from "../drizzle/schema";

// ✅ Get all bookings (optionally filtered by userId)
export const getAllBookingsService = async (
  filter?: { userId?: string }
): Promise<TBookingSelect[]> => {
  if (filter?.userId) {
    return await db.query.booking.findMany({
      where: eq(booking.userId, Number(filter.userId)),
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
export const getBookingByIdService = async (
  id: number
): Promise<TBookingSelect | undefined> => {
  return await db.query.booking.findFirst({
    where: eq(booking.bookingId, id),
    with: {
      event: true,
      user: true,
    },
  });
};

// ✅ Create a new booking and update event.ticketsSold
export const createBookingService = async (
  data: TBookingInsert
): Promise<TBookingSelect> => {
  if (!data.eventId || !data.userId || !data.quantity || data.quantity <= 0) {
    throw new Error("Missing or invalid eventId, userId, or quantity");
  }

  // Fetch the target event
  const targetEvent = await db.query.event.findFirst({
    where: eq(event.eventId, data.eventId),
  });

  if (!targetEvent) {
    throw new Error("Event not found");
  }

  // Ensure ticket fields are not null
  const ticketsSold = targetEvent.ticketsSold ?? 0;
  const ticketsTotal = targetEvent.ticketsTotal ?? 0;
  const ticketPrice = targetEvent.ticketPrice ?? 0;

  // Check if tickets are available
  if (ticketsSold + data.quantity > ticketsTotal) {
    throw new Error("Not enough tickets available");
  }

  // Compute totalAmount if missing or invalid
  if (!data.totalAmount || Number(data.totalAmount) <= 0) {
    const computedTotal = Number(ticketPrice) * data.quantity;
    data.totalAmount = computedTotal.toFixed(2);
  }

  // Insert booking
  const created = await db.insert(booking).values(data).returning();
  const inserted = created[0];

  // Update event's ticketsSold count
  await db
    .update(event)
    .set({
      ticketsSold: ticketsSold + data.quantity,
    })
    .where(eq(event.eventId, data.eventId));

  return inserted;
};

// ✅ Update booking
export const updateBookingService = async (
  id: number,
  data: Partial<TBookingInsert>
): Promise<number> => {
  const updated = await db
    .update(booking)
    .set(data)
    .where(eq(booking.bookingId, id))
    .returning();

  return updated.length;
};

// ✅ Delete booking
export const deleteBookingService = async (id: number): Promise<number> => {
  const deleted = await db
    .delete(booking)
    .where(eq(booking.bookingId, id))
    .returning();

  return deleted.length;
};

// ✅ Confirm booking (set bookingStatus to "Confirmed")
export const confirmBookingService = async (bookingId: number): Promise<number> => {
  const updated = await db
    .update(booking)
    .set({ bookingStatus: "Confirmed" })
    .where(eq(booking.bookingId, bookingId))
    .returning();

  return updated.length;
};
