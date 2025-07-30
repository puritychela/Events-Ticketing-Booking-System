// routes/ticket.route.ts
import { Router } from "express";
import { getMyTickets } from "../tickets/ticket.controller";
import { userRoleAuth } from "../middleware/bearAuth";

const ticketRouter = Router();

ticketRouter.get("/my-tickets", userRoleAuth, getMyTickets);

export default ticketRouter;

