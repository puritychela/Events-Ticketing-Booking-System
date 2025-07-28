"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supportTicket_controller_1 = require("./supportTicket.controller");
const supportTicketRouter = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: SupportTickets
 *   description: Support ticket management
 */
supportTicketRouter.get("/", supportTicket_controller_1.getAllTickets);
supportTicketRouter.get("/:id", supportTicket_controller_1.getTicketById);
supportTicketRouter.post("/", supportTicket_controller_1.createTicket);
supportTicketRouter.put("/:id", supportTicket_controller_1.updateTicket);
supportTicketRouter.delete("/:id", supportTicket_controller_1.deleteTicket);
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
supportTicketRouter.get("/user/:userId", supportTicket_controller_1.getTicketsByUserId);
exports.default = supportTicketRouter;
