import express from "express";
import * as ticketController from "../tickets/ticket.controller";

const router = express.Router();

router.post("/", ticketController.createTicket);
router.get("/user/:userId", ticketController.getTicketsByUser);
router.get("/:ticketId", ticketController.getTicketById);

export default router;
