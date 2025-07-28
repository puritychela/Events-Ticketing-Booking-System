import { Router } from "express";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketsByUserId, // ✅ NEW
} from "./supportTicket.controller";

const supportTicketRouter = Router();

/**
 * @swagger
 * tags:
 *   name: SupportTickets
 *   description: Support ticket management
 */

supportTicketRouter.get("/", getAllTickets);
supportTicketRouter.get("/:id", getTicketById);
supportTicketRouter.post("/", createTicket);
supportTicketRouter.put("/:id", updateTicket);
supportTicketRouter.delete("/:id", deleteTicket);

// ✅ ADD THIS: Get tickets by user ID
/**
 * @swagger
 * /support-tickets/user/{userId}:
 *   get:
 *     summary: Get tickets by user ID
 *     tags: [SupportTickets]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of tickets for the user
 *       404:
 *         description: No tickets found for user
 */
supportTicketRouter.get("/user/:userId", getTicketsByUserId);

export default supportTicketRouter;
