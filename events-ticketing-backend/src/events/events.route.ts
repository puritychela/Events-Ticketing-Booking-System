import { Router } from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "./events.controller";

const eventRouter = Router();

// Base path: /api/users (from server.ts)
eventRouter.get("/", getEvents); 
eventRouter.get("/:id", getEventById); 
eventRouter.post("/", createEvent); 
eventRouter.put("/:id", updateEvent); 
eventRouter.delete("/:id", deleteEvent); 

export default eventRouter;