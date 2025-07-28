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
  authRoleAuth, // both user and admin
  adminRoleAuth,
} from "../middleware/bearAuth";

const bookingRouter = Router();

// ✅ Admin or any authenticated user can view all bookings
bookingRouter.get("/",  getBookings);

// ✅ Authenticated user can view their own bookings
bookingRouter.get("/user/me", userRoleAuth, getMyBookings);

// ✅ Get a single booking - protected (either owner or admin should be checked inside controller if needed)
bookingRouter.get("/:id", authRoleAuth, getBookingById);

// ✅ Only authenticated users (user role) can create a booking
bookingRouter.post("/", userRoleAuth, createBooking);

// ✅ Only authenticated users (user or admin) can update bookings
// NOTE: Ideally, check ownership/admin role inside controller
bookingRouter.put("/:id", authRoleAuth, updateBooking);

// ✅ Only admins can delete bookings
bookingRouter.delete("/:id", adminRoleAuth, deleteBooking);

export default bookingRouter;
