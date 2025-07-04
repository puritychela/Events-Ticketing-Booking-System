import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { event, TEventInsert, TEventSelect } from "../drizzle/schema";

// Get all events
export const getAllEventsService = async (): Promise<TEventSelect[]> => {
  return await db.query.event.findMany();
};

// Get event by ID
export const getEventByIdService = async (id: number): Promise<TEventSelect | undefined> => {
  return await db.query.event.findFirst({
    where: eq(event.eventId, id),
  });
};

// Create new event
export const createEventService = async (data: TEventInsert): Promise<TEventSelect[]> => {
  return await db.insert(event).values(data).returning();
};

// Update event
export const updateEventService = async (
  id: number,
  data: Partial<TEventInsert>
): Promise<TEventSelect[]> => {
  return await db.update(event).set(data).where(eq(event.eventId, id)).returning();
};

// Delete event
export const deleteEventService = async (id: number): Promise<void> => {
  await db.delete(event).where(eq(event.eventId, id));
};
