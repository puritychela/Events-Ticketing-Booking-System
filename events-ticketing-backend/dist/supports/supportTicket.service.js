"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicketService = exports.updateTicketService = exports.createTicketService = exports.getTicketsByUserIdService = exports.getTicketByIdService = exports.getAllTicketsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// Get all tickets
const getAllTicketsService = async () => {
    return await db_1.default.query.supportTicket.findMany();
};
exports.getAllTicketsService = getAllTicketsService;
// Get ticket by ID
const getTicketByIdService = async (id) => {
    return await db_1.default.query.supportTicket.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.supportTicket.ticketId, id),
    });
};
exports.getTicketByIdService = getTicketByIdService;
// ✅ Get tickets by user ID
const getTicketsByUserIdService = async (userId) => {
    return await db_1.default.query.supportTicket.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.supportTicket.userId, userId),
    });
};
exports.getTicketsByUserIdService = getTicketsByUserIdService;
// Create a new ticket
const createTicketService = async (data) => {
    return await db_1.default.insert(schema_1.supportTicket).values(data).returning();
};
exports.createTicketService = createTicketService;
// Update a ticket
const updateTicketService = async (id, data) => {
    const result = await db_1.default
        .update(schema_1.supportTicket)
        .set(data)
        .where((0, drizzle_orm_1.eq)(schema_1.supportTicket.ticketId, id));
    return result.rowCount ?? 0;
};
exports.updateTicketService = updateTicketService;
// Delete a ticket
const deleteTicketService = async (id) => {
    const result = await db_1.default
        .delete(schema_1.supportTicket)
        .where((0, drizzle_orm_1.eq)(schema_1.supportTicket.ticketId, id));
    return result.rowCount ?? 0;
};
exports.deleteTicketService = deleteTicketService;
