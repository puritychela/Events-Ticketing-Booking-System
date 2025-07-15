import { Router } from "express";
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  getMyBookings,
} from "./booking.controller";

import {
  userRoleAuth,
  authRoleAuth, // for both user + admin
} from "../middleware/bearAuth";

const bookingRouter = Router();

// ✅ Admin or both roles can view all bookings
bookingRouter.get("/", authRoleAuth);

// ✅ Authenticated users only (user or admin can view their own)
bookingRouter.get("/user/me", authRoleAuth, getMyBookings);

// ✅ Get single booking (optional: can add auth if needed)
bookingRouter.get("/:id", getBookingById);

// ✅ Only logged-in users (user or admin) can create a booking
bookingRouter.post("/", authRoleAuth, createBooking);

// ✅ Update booking – Optional: protect this route with authRoleAuth
bookingRouter.put("/:id", authRoleAuth, updateBooking);

// ✅ Delete booking – Optional: protect with adminRoleAuth if only admins can delete
bookingRouter.delete("/:id", authRoleAuth, deleteBooking);

export default bookingRouter;
