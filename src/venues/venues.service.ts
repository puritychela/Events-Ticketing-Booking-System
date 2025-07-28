import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { venue } from "../drizzle/schema";
import { TVenueInsert, TVenueSelect } from "../drizzle/schema";

// Get all venues
export const getAllVenuesService = async (): Promise<TVenueSelect[]> => {
  return await db.query.venue.findMany();
};

// Get one venue by ID
export const getVenueByIdService = async (id: number): Promise<TVenueSelect | undefined> => {
  return await db.query.venue.findFirst({
    where: eq(venue.venueId, id),
  });
};

// Create a new venue
export const createVenueService = async (data: TVenueInsert): Promise<TVenueSelect[]> => {
  return await db.insert(venue).values(data).returning();
};

// Update venue
export const updateVenueService = async (
  id: number,
  data: Partial<TVenueInsert>
): Promise<TVenueSelect[]> => {
  return await db.update(venue).set(data).where(eq(venue.venueId, id)).returning();
};

// Delete venue
export const deleteVenueService = async (id: number): Promise<number> => {
  const deleted = await db.delete(venue).where(eq(venue.venueId, id));
  return deleted.rowCount ?? 0;
};
