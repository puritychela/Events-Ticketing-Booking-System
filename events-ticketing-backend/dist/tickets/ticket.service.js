"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketById = exports.getTicketsByUserId = exports.issueTicket = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const nanoid_1 = require("nanoid");
// Generate unique QR code string
const generateQRCode = () => {
    return "QR-" + (0, nanoid_1.nanoid)(10);
};
const issueTicket = async (data) => {
    const newTicket = await db_1.default.insert(schema_1.ticket).values({
        bookingId: data.bookingId,
        eventId: data.eventId,
        userId: data.userId,
        seatNumber: data.seatNumber,
        qrCode: generateQRCode(),
    }).returning();
    return newTicket[0];
};
exports.issueTicket = issueTicket;
const getTicketsByUserId = async (userId) => {
    return db_1.default.select().from(schema_1.ticket).where((0, drizzle_orm_1.eq)(schema_1.ticket.userId, userId));
};
exports.getTicketsByUserId = getTicketsByUserId;
const getTicketById = async (ticketId) => {
    const result = await db_1.default.select().from(schema_1.ticket).where((0, drizzle_orm_1.eq)(schema_1.ticket.ticketId, ticketId));
    return result[0];
};
exports.getTicketById = getTicketById;
