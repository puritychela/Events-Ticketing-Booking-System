// controllers/ticket.controller.ts
import { Request, Response, NextFunction } from "express";
import { getMyTicketsService } from "../tickets/ticket.service";

// GET /api/tickets/my
export const getMyTickets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Ensure the user is authenticated and req.user exists
    if (!req.user || !req.user.userId) {
       res.status(401).json({ error: "Unauthorized: User not authenticated." });
       return;
    }

    const userId = req.user.userId;
    const tickets = await getMyTicketsService(userId);

     res.status(200).json(tickets);
  } catch (err) {
    next(err);
  }
  return;
};

