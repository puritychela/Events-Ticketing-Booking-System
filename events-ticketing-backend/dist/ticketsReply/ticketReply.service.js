"use strict";
// import db from "../drizzle/db";
// import { ticketReply } from "../drizzle/schema";
// import { eq } from "drizzle-orm";
Object.defineProperty(exports, "__esModule", { value: true });
// interface CreateReplyInput {
//   ticketId: number;
//   responderId: number; // ✅ match the schema field name
//   message: string;
// }
// // ✅ Create a reply
// export const createReplyService = async ({
//   ticketId,
//   responderId,
//   message,
// }: CreateReplyInput) => {
//   const [reply] = await db
//     .insert(ticketReply)
//     .values({ ticketId, responderId, message }) // ✅ use responderId not userId
//     .returning();
//   return reply;
// };
// // ✅ Get all replies for a ticket
// export const getRepliesByTicketIdService = async (ticketId: number) => {
//   const replies = await db
//     .select()
//     .from(ticketReply)
//     .where(eq(ticketReply.ticketId, ticketId));
//   return replies;
// };
