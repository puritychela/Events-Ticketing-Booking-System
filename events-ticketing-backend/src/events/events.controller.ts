import { Request, Response, NextFunction } from "express";
import {
  createEventService,
  deleteEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService,
} from "./events.service";

// GET /api/events
export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await getAllEventsService();
    if (!events || events.length === 0) {
       res.status(404).json({ message: "No events found" });
       return;
    }
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

// GET /api/events/:id
export const getEventById = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = parseInt(req.params.id);
  if (isNaN(eventId))  res.status(400).json({ error: "Invalid event ID" });
  return;

  try {
    const event = await getEventByIdService(eventId);
    if (!event) res.status(404).json({ message: "Event not found" });
    return ;
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

// POST /api/events
export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newEvent = await createEventService(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

// PUT /api/events/:id
export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = parseInt(req.params.id);
  if (isNaN(eventId))  res.status(400).json({ error: "Invalid event ID" });
  return;

  try {
    const updatedEvent = await updateEventService(eventId, req.body);
    res.status(200).json(updatedEvent);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/events/:id
export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = parseInt(req.params.id);
  if (isNaN(eventId))  res.status(400).json({ error: "Invalid event ID" });
  return;

  try {
    await deleteEventService(eventId);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    next(error);
  }
};
