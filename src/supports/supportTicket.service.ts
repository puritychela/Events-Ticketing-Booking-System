import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {
  supportTicket,
  TSupportTicketInsert,
  TSupportTicketSelect,
} from "../drizzle/schema";

// Get all tickets
export const getAllTicketsService = async (): Promise<TSupportTicketSelect[]> => {
  return await db.query.supportTicket.findMany();
};

// Get ticket by ID
export const getTicketByIdService = async (id: number): Promise<TSupportTicketSelect | undefined> => {
  return await db.query.supportTicket.findFirst({
    where: eq(supportTicket.ticketId, id),
  });
};

// ✅ Get tickets by user ID
export const getTicketsByUserIdService = async (
  userId: number
): Promise<TSupportTicketSelect[]> => {
  return await db.query.supportTicket.findMany({
    where: eq(supportTicket.userId, userId),
  });
};

// Create a new ticket
export const createTicketService = async (
  data: TSupportTicketInsert
): Promise<TSupportTicketSelect[]> => {
  return await db.insert(supportTicket).values(data).returning();
};

// Update a ticket
export const updateTicketService = async (
  id: number,
  data: Partial<TSupportTicketInsert>
): Promise<number> => {
  const result = await db
    .update(supportTicket)
    .set(data)
    .where(eq(supportTicket.ticketId, id));
  return result.rowCount ?? 0;
};

// Delete a ticket
export const deleteTicketService = async (id: number): Promise<number> => {
  const result = await db
    .delete(supportTicket)
    .where(eq(supportTicket.ticketId, id));
  return result.rowCount ?? 0;
};
