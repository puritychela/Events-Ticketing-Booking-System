"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmBookingService = exports.deleteBookingService = exports.updateBookingService = exports.createBookingService = exports.getBookingByIdService = exports.getAllBookingsService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
// ✅ Get all bookings (optionally filtered by userId)
const getAllBookingsService = async (filter) => {
    if (filter?.userId) {
        return await db_1.default.query.booking.findMany({
            where: (0, drizzle_orm_1.eq)(schema_1.booking.userId, Number(filter.userId)),
            with: {
                event: true,
            },
        });
    }
    return await db_1.default.query.booking.findMany({
        with: {
            event: true,
            user: true,
        },
    });
};
exports.getAllBookingsService = getAllBookingsService;
// ✅ Get a single booking by ID
const getBookingByIdService = async (id) => {
    return await db_1.default.query.booking.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.booking.bookingId, id),
        with: {
            event: true,
            user: true,
        },
    });
};
exports.getBookingByIdService = getBookingByIdService;
// ✅ Create a new booking and update event.ticketsSold
const createBookingService = async (data) => {
    if (!data.eventId || !data.userId || !data.quantity || data.quantity <= 0) {
        throw new Error("Missing or invalid eventId, userId, or quantity");
    }
    // Fetch the target event
    const targetEvent = await db_1.default.query.event.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.event.eventId, data.eventId),
    });
    if (!targetEvent) {
        throw new Error("Event not found");
    }
    // Ensure ticket fields are not null
    const ticketsSold = targetEvent.ticketsSold ?? 0;
    const ticketsTotal = targetEvent.ticketsTotal ?? 0;
    const ticketPrice = targetEvent.ticketPrice ?? 0;
    // Check if tickets are available
    if (ticketsSold + data.quantity > ticketsTotal) {
        throw new Error("Not enough tickets available");
    }
    // Compute totalAmount if missing or invalid
    if (!data.totalAmount || Number(data.totalAmount) <= 0) {
        const computedTotal = Number(ticketPrice) * data.quantity;
        data.totalAmount = computedTotal.toFixed(2);
    }
    // Insert booking
    const created = await db_1.default.insert(schema_1.booking).values(data).returning();
    const inserted = created[0];
    // Update event's ticketsSold count
    await db_1.default
        .update(schema_1.event)
        .set({
        ticketsSold: ticketsSold + data.quantity,
    })
        .where((0, drizzle_orm_1.eq)(schema_1.event.eventId, data.eventId));
    return inserted;
};
exports.createBookingService = createBookingService;
// ✅ Update booking
const updateBookingService = async (id, data) => {
    const updated = await db_1.default
        .update(schema_1.booking)
        .set(data)
        .where((0, drizzle_orm_1.eq)(schema_1.booking.bookingId, id))
        .returning();
    return updated.length;
};
exports.updateBookingService = updateBookingService;
// ✅ Delete booking
const deleteBookingService = async (id) => {
    const deleted = await db_1.default
        .delete(schema_1.booking)
        .where((0, drizzle_orm_1.eq)(schema_1.booking.bookingId, id))
        .returning();
    return deleted.length;
};
exports.deleteBookingService = deleteBookingService;
// ✅ Confirm booking (set bookingStatus to "Confirmed")
const confirmBookingService = async (bookingId) => {
    const updated = await db_1.default
        .update(schema_1.booking)
        .set({ bookingStatus: "Confirmed" })
        .where((0, drizzle_orm_1.eq)(schema_1.booking.bookingId, bookingId))
        .returning();
    return updated.length;
};
exports.confirmBookingService = confirmBookingService;
