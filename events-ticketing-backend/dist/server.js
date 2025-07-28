"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./users/user.route"));
const events_route_1 = __importDefault(require("./events/events.route"));
const booking_route_1 = __importDefault(require("./bookings/booking.route"));
const supportTicket_route_1 = __importDefault(require("./supports/supportTicket.route"));
const venues_route_1 = __importDefault(require("./venues/venues.route"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const rateLimiter_1 = require("./middleware/rateLimiter");
const payments_route_1 = __importDefault(require("./payments/payments.route"));
const daraja_route_1 = __importDefault(require("./darajaPayments/daraja.route"));
// import ticketReplyRouter from "./ticketsReply/TicketsReply.route";
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Built-in middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
//  Correct usage of rate limiter (must pass the actual function, not a string)
app.use(rateLimiter_1.rateLimiterMiddleware);
app.get("/", (req, res) => {
    res.send("Welcome to Express + TypeScript Backend");
});
// Routers
app.use("/api/users", user_route_1.default);
app.use("/api/events", events_route_1.default);
app.use("/api/bookings", booking_route_1.default);
app.use("/api/support", supportTicket_route_1.default);
app.use("/api/venues", venues_route_1.default);
app.use("/api", auth_route_1.default);
app.use("/api/payments", payments_route_1.default);
app.use("/api/darajaPayments", daraja_route_1.default);
// app.use("/api", ticketReplyRouter);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    //swaggerDocs(app, PORT);
});
