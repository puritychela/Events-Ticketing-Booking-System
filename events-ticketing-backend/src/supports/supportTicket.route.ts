import { Router } from "express";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from "./supportTicket.controller";

const supportTicketRouter = Router();

/**
 * @swagger
 * tags:
 *   name: SupportTickets
 *   description: Support ticket management
 */

/**
 * @swagger
 * /support-tickets:
 *   get:
 *     summary: Get all support tickets
 *     tags: [SupportTickets]
 *     responses:
 *       200:
 *         description: List of support tickets
 */
supportTicketRouter.get("/", getAllTickets);

/**
 * @swagger
 * /support-tickets/{id}:
 *   get:
 *     summary: Get a support ticket by ID
 *     tags: [SupportTickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Support ticket ID
 *     responses:
 *       200:
 *         description: Ticket found
 *       404:
 *         description: Ticket not found
 */
supportTicketRouter.get("/:id", getTicketById);

/**
 * @swagger
 * /support-tickets:
 *   post:
 *     summary: Create a new support ticket
 *     tags: [SupportTickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - message
 *               - userId
 *             properties:
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket created
 */
supportTicketRouter.post("/", createTicket);

/**
 * @swagger
 * /support-tickets/{id}:
 *   put:
 *     summary: Update a support ticket
 *     tags: [SupportTickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Support ticket ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [open, closed, pending]
 *     responses:
 *       200:
 *         description: Ticket updated
 */
supportTicketRouter.put("/:id", updateTicket);

/**
 * @swagger
 * /support-tickets/{id}:
 *   delete:
 *     summary: Delete a support ticket
 *     tags: [SupportTickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Ticket deleted
 */
supportTicketRouter.delete("/:id", deleteTicket);

export default supportTicketRouter;
