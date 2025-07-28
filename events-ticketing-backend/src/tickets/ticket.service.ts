import db from "../drizzle/db";
import { ticket } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

interface IssueTicketInput {
  bookingId: number;
  eventId: number;
  userId: number;
  seatNumber?: string;
}

// Generate unique QR code string
const generateQRCode = () => {
  return "QR-" + nanoid(10);
};

export const issueTicket = async (data: IssueTicketInput) => {
  const newTicket = await db.insert(ticket).values({
    bookingId: data.bookingId,
    eventId: data.eventId,
    userId: data.userId,
    seatNumber: data.seatNumber,
    qrCode: generateQRCode(),
  }).returning();

  return newTicket[0];
};

export const getTicketsByUserId = async (userId: number) => {
  return db.select().from(ticket).where(eq(ticket.userId, userId));
};

export const getTicketById = async (ticketId: number) => {
  const result = await db.select().from(ticket).where(eq(ticket.ticketId, ticketId));
  return result[0];
};
