"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBookingById = exports.getMyBookings = exports.getBookings = void 0;
const booking_service_1 = require("./booking.service");
// ✅ GET /api/bookings
const getBookings = async (req, res, next) => {
    try {
        const bookings = await (0, booking_service_1.getAllBookingsService)();
        res.status(200).json(bookings);
        return;
    }
    catch (err) {
        next(err);
        return;
    }
};
exports.getBookings = getBookings;
// ✅ GET /api/bookings/user/me
const getMyBookings = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized – user not authenticated" });
            return;
        }
        const bookings = await (0, booking_service_1.getAllBookingsService)({ userId: String(userId) });
        res.status(200).json(bookings);
        return;
    }
    catch (err) {
        next(err);
        return;
    }
};
exports.getMyBookings = getMyBookings;
// ✅ GET /api/bookings/:id
const getBookingById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid booking ID" });
        return;
    }
    try {
        const booking = await (0, booking_service_1.getBookingByIdService)(id);
        if (!booking) {
            res.status(404).json({ message: "Booking not found" });
            return;
        }
        res.status(200).json(booking);
        return;
    }
    catch (err) {
        next(err);
        return;
    }
};
exports.getBookingById = getBookingById;
// ✅ POST /api/bookings
const createBooking = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        const { eventId, quantity } = req.body;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized – user not authenticated" });
            return;
        }
        const parsedEventId = Number(eventId);
        const parsedQuantity = Number(quantity);
        if (!parsedEventId || isNaN(parsedEventId)) {
            res.status(400).json({ message: "Valid eventId is required" });
            return;
        }
        if (!parsedQuantity || isNaN(parsedQuantity) || parsedQuantity <= 0) {
            res.status(400).json({ message: "Valid quantity is required" });
            return;
        }
        const newBooking = await (0, booking_service_1.createBookingService)({
            userId,
            eventId: parsedEventId,
            quantity: parsedQuantity,
            bookingStatus: "Pending",
        });
        res.status(201).json(newBooking);
        return;
    }
    catch (err) {
        next(err);
        return;
    }
};
exports.createBooking = createBooking;
// ✅ PUT /api/bookings/:id
const updateBooking = async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid booking ID" });
        return;
    }
    try {
        const updatedCount = await (0, booking_service_1.updateBookingService)(id, req.body);
        if (updatedCount === 0) {
            res.status(404).json({ message: "Booking not found" });
            return;
        }
        res.status(200).json({ message: "Booking updated successfully" });
        return;
    }
    catch (err) {
        next(err);
        return;
    }
};
exports.updateBooking = updateBooking;
// ✅ DELETE /api/bookings/:id
const deleteBooking = async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid booking ID" });
        return;
    }
    try {
        const deletedCount = await (0, booking_service_1.deleteBookingService)(id);
        if (deletedCount === 0) {
            res.status(404).json({ message: "Booking not found" });
            return;
        }
        res.status(200).json({ message: "Booking deleted successfully" });
        return;
    }
    catch (err) {
        next(err);
        return;
    }
};
exports.deleteBooking = deleteBooking;
