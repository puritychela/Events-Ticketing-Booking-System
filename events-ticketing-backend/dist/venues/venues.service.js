"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVenueService = exports.updateVenueService = exports.createVenueService = exports.getVenueByIdService = exports.getAllVenuesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// Get all venues
const getAllVenuesService = async () => {
    return await db_1.default.query.venue.findMany();
};
exports.getAllVenuesService = getAllVenuesService;
// Get one venue by ID
const getVenueByIdService = async (id) => {
    return await db_1.default.query.venue.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.venue.venueId, id),
    });
};
exports.getVenueByIdService = getVenueByIdService;
// Create a new venue
const createVenueService = async (data) => {
    return await db_1.default.insert(schema_1.venue).values(data).returning();
};
exports.createVenueService = createVenueService;
// Update venue
const updateVenueService = async (id, data) => {
    return await db_1.default.update(schema_1.venue).set(data).where((0, drizzle_orm_1.eq)(schema_1.venue.venueId, id)).returning();
};
exports.updateVenueService = updateVenueService;
// Delete venue
const deleteVenueService = async (id) => {
    const deleted = await db_1.default.delete(schema_1.venue).where((0, drizzle_orm_1.eq)(schema_1.venue.venueId, id));
    return deleted.rowCount ?? 0;
};
exports.deleteVenueService = deleteVenueService;
