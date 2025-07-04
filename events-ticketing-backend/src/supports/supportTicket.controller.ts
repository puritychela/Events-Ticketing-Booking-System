import { Request, Response, NextFunction } from "express";
import {
  createTicketService,
  getAllTicketsService,
  getTicketByIdService,
  updateTicketService,
  deleteTicketService,
} from "././supportTicket.service";

// GET all tickets
export const getAllTickets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tickets = await getAllTicketsService();
    if (!tickets || tickets.length === 0) {
      res.status(404).json({ message: "No tickets found" });
      return;
    }
    res.status(200).json(tickets);
    return;
  } catch (error) {
    next(error);
  }
};

// GET ticket by ID
export const getTicketById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ticket ID" });
    return;
  }

  try {
    const ticket = await getTicketByIdService(id);
    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }
    res.status(200).json(ticket);
    return;
  } catch (error) {
    next(error);
  }
};

// CREATE a new support ticket
export const createTicket = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, subject, description } = req.body;

  if (!userId || !subject || !description) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const newTicket = await createTicketService({ userId, subject, description });
    res.status(201).json(newTicket);
    return;
  } catch (error) {
    next(error);
  }
};

// UPDATE a support ticket
export const updateTicket = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ticket ID" });
    return;
  }

  try {
    const updated = await updateTicketService(id, req.body);
    if (updated === 0) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }
    res.status(200).json({ message: "Ticket updated successfully" });
    return;
  } catch (error) {
    next(error);
  }
};

// DELETE a ticket
export const deleteTicket = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ticket ID" });
    return;
  }

  try {
    const deleted = await deleteTicketService(id);
    if (deleted === 0) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }
    res.status(200).json({ message: "Ticket deleted successfully" });
    return;
  } catch (error) {
    next(error);
  }
};

