import { Router } from "express";
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "./booking.controller";

const bookingRouter = Router();

// Base path: /api/users (from server.ts)
bookingRouter.get("/", getBookings); 
bookingRouter.get("/:id", getBookingById); 
bookingRouter.post("/", createBooking); 
bookingRouter.put("/:id", updateBooking); 
bookingRouter.delete("/:id", deleteBooking); 

export default bookingRouter;