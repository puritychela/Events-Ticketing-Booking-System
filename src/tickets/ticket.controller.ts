import { Request, Response } from "express";
import * as ticketService from "../tickets/ticket.service";

/**
 * Issue a new ticket after successful booking/payment
 */
export const createTicket = async (req: Request, res: Response) => {
  const { bookingId, eventId, userId, seatNumber } = req.body;

  if (!bookingId || !eventId || !userId) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const ticket = await ticketService.issueTicket({
      bookingId,
      eventId,
      userId,
      seatNumber,
    });
    res.status(201).json(ticket);
    return;
  } catch (error) {
    console.error("Ticket creation failed:", error);
    res.status(500).json({ message: "Failed to create ticket" });
    return;
  }
};

/**
 * Get all tickets for a specific user
 */
export const getTicketsByUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  if (!userId) {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }

  try {
    const tickets = await ticketService.getTicketsByUserId(userId);
    res.json(tickets);
    return;
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    res.status(500).json({ message: "Failed to fetch tickets" });
    return;
  }
};

/**
 * Get a single ticket by ticketId
 */
export const getTicketById = async (req: Request, res: Response) => {
  const ticketId = Number(req.params.ticketId);

  if (!ticketId) {
    res.status(400).json({ message: "Invalid ticket ID" });
    return;
  }

  try {
    const ticket = await ticketService.getTicketById(ticketId);
    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }
    res.json(ticket);
    return;
  } catch (error) {
    console.error("Error getting ticket:", error);
    res.status(500).json({ message: "Failed to get ticket" });
    return;
  }
};
