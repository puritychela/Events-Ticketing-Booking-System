"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const bearAuth_1 = require("../middleware/bearAuth");
const bookingRouter = (0, express_1.Router)();
// ✅ Admin or any authenticated user can view all bookings
bookingRouter.get("/", booking_controller_1.getBookings);
// ✅ Authenticated user can view their own bookings
bookingRouter.get("/user/me", bearAuth_1.userRoleAuth, booking_controller_1.getMyBookings);
// ✅ Get a single booking - protected (either owner or admin should be checked inside controller if needed)
bookingRouter.get("/:id", bearAuth_1.authRoleAuth, booking_controller_1.getBookingById);
// ✅ Only authenticated users (user role) can create a booking
bookingRouter.post("/", bearAuth_1.userRoleAuth, booking_controller_1.createBooking);
// ✅ Only authenticated users (user or admin) can update bookings
// NOTE: Ideally, check ownership/admin role inside controller
bookingRouter.put("/:id", bearAuth_1.authRoleAuth, booking_controller_1.updateBooking);
// ✅ Only admins can delete bookings
bookingRouter.delete("/:id", bearAuth_1.adminRoleAuth, booking_controller_1.deleteBooking);
exports.default = bookingRouter;
