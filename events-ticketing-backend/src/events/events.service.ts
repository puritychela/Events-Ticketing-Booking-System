import db from "../drizzle/db";
import { eq, and, sql } from "drizzle-orm";
import { event, TEventInsert, TEventSelect } from "../drizzle/schema";

// ✅ Get all events with optional search, category, venueId, eventType, accessLevel filters
export const getAllEventsService = async (filters?: {
  search?: string;
  category?: string;
  venueId?: number;
  eventType?: "Online" | "In-person";
  accessLevel?: "Free" | "VIP";
}): Promise<TEventSelect[]> => {
  const whereClauses = [];

  if (filters?.search) {
    whereClauses.push(
      sql`lower(${event.title}) LIKE ${`%${filters.search.toLowerCase()}%`}`
    );
  }

  if (filters?.category) {
    whereClauses.push(eq(event.category, filters.category));
  }

  if (filters?.venueId) {
    whereClauses.push(eq(event.venueId, filters.venueId));
  }

  if (filters?.eventType) {
    whereClauses.push(eq(event.eventType, filters.eventType));
  }

  if (filters?.accessLevel) {
    whereClauses.push(eq(event.accessLevel, filters.accessLevel));
  }

  return await db.query.event.findMany({
    where: whereClauses.length > 0 ? and(...whereClauses) : undefined,
  });
};

// ✅ Get event by ID
export const getEventByIdService = async (id: number): Promise<TEventSelect | undefined> => {
  return await db.query.event.findFirst({
    where: eq(event.eventId, id),
  });
};

// ✅ Create new event
export const createEventService = async (data: TEventInsert): Promise<TEventSelect[]> => {
  return await db.insert(event).values(data).returning();
};

// ✅ Update event
export const updateEventService = async (
  id: number,
  data: Partial<TEventInsert>
): Promise<TEventSelect[]> => {
  return await db.update(event).set(data).where(eq(event.eventId, id)).returning();
};

// ✅ Delete event
export const deleteEventService = async (id: number): Promise<void> => {
  await db.delete(event).where(eq(event.eventId, id));
};
