"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRelations = exports.ticket = exports.ticketReplyRelations = exports.ticketReply = exports.supportTicketRelations = exports.supportTicket = exports.paymentRelations = exports.payment = exports.bookingRelations = exports.booking = exports.eventRelations = exports.event = exports.venueRelations = exports.venue = exports.userRelations = exports.user = exports.eventTypeEnum = exports.accessLevelEnum = exports.paymentStatusEnum = exports.bookingStatusEnum = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// Enums
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["user", "admin"]);
exports.bookingStatusEnum = (0, pg_core_1.pgEnum)("booking_status", ["Pending", "Confirmed", "Cancelled"]);
exports.paymentStatusEnum = (0, pg_core_1.pgEnum)("payment_status", ["Pending", "Paid", "Failed"]);
exports.accessLevelEnum = (0, pg_core_1.pgEnum)("access_level", ["Free", "VIP"]);
exports.eventTypeEnum = (0, pg_core_1.pgEnum)("event_type", ["Online", "In-person"]);
// Users Table
exports.user = (0, pg_core_1.pgTable)("users", {
    userId: (0, pg_core_1.serial)("user_id").primaryKey(),
    firstname: (0, pg_core_1.varchar)("firstname", { length: 50 }),
    lastname: (0, pg_core_1.varchar)("lastname", { length: 50 }),
    email: (0, pg_core_1.varchar)("email", { length: 100 }).unique(),
    password: (0, pg_core_1.varchar)("password", { length: 255 }),
    contactPhone: (0, pg_core_1.varchar)("contact_phone", { length: 20 }),
    address: (0, pg_core_1.varchar)("address", { length: 100 }),
    role: (0, exports.roleEnum)("role").default("user"),
    profilepicture: (0, pg_core_1.varchar)("profilepicture", { length: 255 }),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.userRelations = (0, drizzle_orm_1.relations)(exports.user, ({ many }) => ({
    bookings: many(exports.booking),
    supportTickets: many(exports.supportTicket),
}));
// Venues Table
exports.venue = (0, pg_core_1.pgTable)("venues", {
    venueId: (0, pg_core_1.serial)("venue_id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 100 }),
    address: (0, pg_core_1.varchar)("address", { length: 150 }),
    capacity: (0, pg_core_1.integer)("capacity"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.venueRelations = (0, drizzle_orm_1.relations)(exports.venue, ({ many }) => ({
    events: many(exports.event),
}));
// Events Table
exports.event = (0, pg_core_1.pgTable)("events", {
    eventId: (0, pg_core_1.serial)("event_id").primaryKey(),
    title: (0, pg_core_1.varchar)("title", { length: 100 }),
    description: (0, pg_core_1.text)("description"),
    venueId: (0, pg_core_1.integer)("venue_id").references(() => exports.venue.venueId, { onDelete: "cascade" }),
    category: (0, pg_core_1.varchar)("category", { length: 50 }),
    date: (0, pg_core_1.date)("date"),
    time: (0, pg_core_1.time)("time"),
    ticketPrice: (0, pg_core_1.decimal)("ticket_price", { precision: 10, scale: 2 }),
    ticketsTotal: (0, pg_core_1.integer)("tickets_total"),
    ticketsSold: (0, pg_core_1.integer)("tickets_sold").default(0),
    imageUrl: (0, pg_core_1.varchar)("image_url", { length: 255 }), // ✅ added image field
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
    eventType: (0, exports.eventTypeEnum)("event_type"), // "Online" | "In-person"
    accessLevel: (0, exports.accessLevelEnum)("access_level"),
});
exports.eventRelations = (0, drizzle_orm_1.relations)(exports.event, ({ many, one }) => ({
    venue: one(exports.venue, {
        fields: [exports.event.venueId],
        references: [exports.venue.venueId],
    }),
    bookings: many(exports.booking),
}));
// Bookings Table
exports.booking = (0, pg_core_1.pgTable)("bookings", {
    bookingId: (0, pg_core_1.serial)("booking_id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.user.userId, { onDelete: "cascade" }),
    eventId: (0, pg_core_1.integer)("event_id").references(() => exports.event.eventId, { onDelete: "cascade" }),
    quantity: (0, pg_core_1.integer)("quantity"),
    totalAmount: (0, pg_core_1.decimal)("total_amount", { precision: 10, scale: 2 }),
    bookingStatus: (0, exports.bookingStatusEnum)("booking_status").default("Pending"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.bookingRelations = (0, drizzle_orm_1.relations)(exports.booking, ({ one, many }) => ({
    user: one(exports.user, {
        fields: [exports.booking.userId],
        references: [exports.user.userId],
    }),
    event: one(exports.event, {
        fields: [exports.booking.eventId],
        references: [exports.event.eventId],
    }),
    payments: many(exports.payment),
}));
// Payments Table
exports.payment = (0, pg_core_1.pgTable)("payments", {
    paymentId: (0, pg_core_1.serial)("payment_id").primaryKey(),
    bookingId: (0, pg_core_1.integer)("booking_id").references(() => exports.booking.bookingId, { onDelete: "cascade" }),
    phone: (0, pg_core_1.varchar)("phone", { length: 20 }),
    amount: (0, pg_core_1.decimal)("amount", { precision: 10, scale: 2 }),
    paymentStatus: (0, exports.paymentStatusEnum)("payment_status").default("Pending"),
    paymentDate: (0, pg_core_1.timestamp)("payment_date").defaultNow(),
    paymentMethod: (0, pg_core_1.varchar)("payment_method", { length: 50 }),
    transactionId: (0, pg_core_1.varchar)("transaction_id", { length: 100 }),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.paymentRelations = (0, drizzle_orm_1.relations)(exports.payment, ({ one }) => ({
    booking: one(exports.booking, {
        fields: [exports.payment.bookingId],
        references: [exports.booking.bookingId],
    }),
}));
// Support Tickets Table
exports.supportTicket = (0, pg_core_1.pgTable)("support_tickets", {
    ticketId: (0, pg_core_1.serial)("ticket_id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.user.userId, { onDelete: "cascade" }),
    subject: (0, pg_core_1.varchar)("subject", { length: 100 }),
    description: (0, pg_core_1.text)("description"),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).default("Open"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.supportTicketRelations = (0, drizzle_orm_1.relations)(exports.supportTicket, ({ one }) => ({
    user: one(exports.user, {
        fields: [exports.supportTicket.userId],
        references: [exports.user.userId],
    }),
}));
exports.ticketReply = (0, pg_core_1.pgTable)("ticket_replies", {
    replyId: (0, pg_core_1.serial)("reply_id").primaryKey(),
    ticketId: (0, pg_core_1.integer)("ticket_id")
        .references(() => exports.supportTicket.ticketId, { onDelete: "cascade" }),
    responderId: (0, pg_core_1.integer)("responder_id")
        .references(() => exports.user.userId, { onDelete: "cascade" }), // could be admin or user
    message: (0, pg_core_1.text)("message"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.ticketReplyRelations = (0, drizzle_orm_1.relations)(exports.ticketReply, ({ one }) => ({
    ticket: one(exports.supportTicket, {
        fields: [exports.ticketReply.ticketId],
        references: [exports.supportTicket.ticketId],
    }),
    responder: one(exports.user, {
        fields: [exports.ticketReply.responderId],
        references: [exports.user.userId],
    }),
}));
exports.ticket = (0, pg_core_1.pgTable)("tickets", {
    ticketId: (0, pg_core_1.serial)("ticket_id").primaryKey(),
    bookingId: (0, pg_core_1.integer)("booking_id").references(() => exports.booking.bookingId, { onDelete: "cascade" }),
    eventId: (0, pg_core_1.integer)("event_id").references(() => exports.event.eventId, { onDelete: "cascade" }),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.user.userId, { onDelete: "cascade" }),
    qrCode: (0, pg_core_1.varchar)("qr_code", { length: 255 }),
    seatNumber: (0, pg_core_1.varchar)("seat_number", { length: 50 }),
    issuedAt: (0, pg_core_1.timestamp)("issued_at").defaultNow(),
});
exports.ticketRelations = (0, drizzle_orm_1.relations)(exports.ticket, ({ one }) => ({
    booking: one(exports.booking, { fields: [exports.ticket.bookingId], references: [exports.booking.bookingId] }),
    event: one(exports.event, { fields: [exports.ticket.eventId], references: [exports.event.eventId] }),
    user: one(exports.user, { fields: [exports.ticket.userId], references: [exports.user.userId] }),
}));
