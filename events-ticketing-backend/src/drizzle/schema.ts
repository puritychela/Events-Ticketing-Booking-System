import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  decimal,
  date,
  time,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const bookingStatusEnum = pgEnum("booking_status", ["Pending", "Confirmed", "Cancelled"]);
export const paymentStatusEnum = pgEnum("payment_status", ["Pending", "Paid", "Failed"]);

// Users Table
export const user = pgTable("users", {
  userId: serial("user_id").primaryKey(),
  firstname: varchar("firstname", { length: 50 }),
  lastname: varchar("lastname", { length: 50 }),
  email: varchar("email", { length: 100 }).unique(),
  password: varchar("password", { length: 255 }),
  contactPhone: varchar("contact_phone", { length: 20 }),
  address: varchar("address", { length: 100 }),
  role: roleEnum("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  bookings: many(booking),
  supportTickets: many(supportTicket),
}));

// Venues Table
export const venue = pgTable("venues", {
  venueId: serial("venue_id").primaryKey(),
  name: varchar("name", { length: 100 }),
  address: varchar("address", { length: 150 }),
  capacity: integer("capacity"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const venueRelations = relations(venue, ({ many }) => ({
  events: many(event),
}));

// Events Table
export const event = pgTable("events", {
  eventId: serial("event_id").primaryKey(),
  title: varchar("title", { length: 100 }),
  description: text("description"),
  venueId: integer("venue_id").references(() => venue.venueId, { onDelete: "cascade" }),
  category: varchar("category", { length: 50 }),
  date: date("date"),
  time: time("time"),
  ticketPrice: decimal("ticket_price", { precision: 10, scale: 2 }),
  ticketsTotal: integer("tickets_total"),
  ticketsSold: integer("tickets_sold").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const eventRelations = relations(event, ({ many, one }) => ({
  venue: one(venue, {
    fields: [event.venueId],
    references: [venue.venueId],
  }),
  bookings: many(booking),
}));

// Bookings Table
export const booking = pgTable("bookings", {
  bookingId: serial("booking_id").primaryKey(),
  userId: integer("user_id").references(() => user.userId, { onDelete: "cascade" }),
  eventId: integer("event_id").references(() => event.eventId, { onDelete: "cascade" }),
  quantity: integer("quantity"),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }),
  bookingStatus: bookingStatusEnum("booking_status").default("Pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const bookingRelations = relations(booking, ({ one, many }) => ({
  user: one(user, {
    fields: [booking.userId],
    references: [user.userId],
  }),
  event: one(event, {
    fields: [booking.eventId],
    references: [event.eventId],
  }),
  payments: many(payment),
}));

// Payments Table
export const payment = pgTable("payments", {
  paymentId: serial("payment_id").primaryKey(),
  bookingId: integer("booking_id").references(() => booking.bookingId, { onDelete: "cascade" }),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  paymentStatus: paymentStatusEnum("payment_status").default("Pending"),
  paymentDate: timestamp("payment_date").defaultNow(),
  paymentMethod: varchar("payment_method", { length: 50 }),
  transactionId: varchar("transaction_id", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const paymentRelations = relations(payment, ({ one }) => ({
  booking: one(booking, {
    fields: [payment.bookingId],
    references: [booking.bookingId],
  }),
}));

// Support Tickets Table
export const supportTicket = pgTable("support_tickets", {
  ticketId: serial("ticket_id").primaryKey(),
  userId: integer("user_id").references(() => user.userId, { onDelete: "cascade" }),
  subject: varchar("subject", { length: 100 }),
  description: text("description"),
  status: varchar("status", { length: 50 }).default("Open"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const supportTicketRelations = relations(supportTicket, ({ one }) => ({
  user: one(user, {
    fields: [supportTicket.userId],
    references: [user.userId],
  }),
}));


// Infer types
export type TUserInsert = typeof user.$inferInsert;
export type TUserSelect = typeof user.$inferSelect;

export type TVenueInsert = typeof venue.$inferInsert;
export type TVenueSelect = typeof venue.$inferSelect;

export type TEventInsert = typeof event.$inferInsert;
export type TEventSelect = typeof event.$inferSelect;

export type TBookingInsert = typeof booking.$inferInsert;
export type TBookingSelect = typeof booking.$inferSelect;

export type TPaymentInsert = typeof payment.$inferInsert;
export type TPaymentSelect = typeof payment.$inferSelect;

export type TSupportTicketInsert = typeof supportTicket.$inferInsert;
export type TSupportTicketSelect = typeof supportTicket.$inferSelect;

