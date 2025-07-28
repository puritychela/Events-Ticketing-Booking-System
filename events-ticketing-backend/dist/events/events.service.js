"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEventService = exports.updateEventService = exports.createEventService = exports.getEventByIdService = exports.getAllEventsService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
// ✅ Get all events with optional search, category, venueId, eventType, accessLevel filters
const getAllEventsService = async (filters) => {
    const whereClauses = [];
    if (filters?.search) {
        whereClauses.push((0, drizzle_orm_1.sql) `lower(${schema_1.event.title}) LIKE ${`%${filters.search.toLowerCase()}%`}`);
    }
    if (filters?.category) {
        whereClauses.push((0, drizzle_orm_1.eq)(schema_1.event.category, filters.category));
    }
    if (filters?.venueId) {
        whereClauses.push((0, drizzle_orm_1.eq)(schema_1.event.venueId, filters.venueId));
    }
    if (filters?.eventType) {
        whereClauses.push((0, drizzle_orm_1.eq)(schema_1.event.eventType, filters.eventType));
    }
    if (filters?.accessLevel) {
        whereClauses.push((0, drizzle_orm_1.eq)(schema_1.event.accessLevel, filters.accessLevel));
    }
    return await db_1.default.query.event.findMany({
        where: whereClauses.length > 0 ? (0, drizzle_orm_1.and)(...whereClauses) : undefined,
    });
};
exports.getAllEventsService = getAllEventsService;
// ✅ Get event by ID
const getEventByIdService = async (id) => {
    return await db_1.default.query.event.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.event.eventId, id),
    });
};
exports.getEventByIdService = getEventByIdService;
// ✅ Create new event
const createEventService = async (data) => {
    return await db_1.default.insert(schema_1.event).values(data).returning();
};
exports.createEventService = createEventService;
// ✅ Update event
const updateEventService = async (id, data) => {
    return await db_1.default.update(schema_1.event).set(data).where((0, drizzle_orm_1.eq)(schema_1.event.eventId, id)).returning();
};
exports.updateEventService = updateEventService;
// ✅ Delete event
const deleteEventService = async (id) => {
    await db_1.default.delete(schema_1.event).where((0, drizzle_orm_1.eq)(schema_1.event.eventId, id));
};
exports.deleteEventService = deleteEventService;
