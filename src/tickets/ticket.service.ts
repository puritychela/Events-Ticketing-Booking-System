// services/ticket.service.ts
import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { ticket } from "../drizzle/schema";

export const getMyTicketsService = async (userId: number) => {
  return db.query.ticket.findMany({
    where: eq(ticket.userId, userId),
  });
};

