import { Router } from "express";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from "./supportTicket.controller";

const supportTicketRouter = Router();

// Base path: /api/users (from server.ts)
supportTicketRouter.get("/", getAllTickets); 
supportTicketRouter.get("/:id", getTicketById); 
supportTicketRouter.post("/", createTicket); 
supportTicketRouter.put("/:id", updateTicket); 
supportTicketRouter.delete("/:id", deleteTicket); 

export default supportTicketRouter;