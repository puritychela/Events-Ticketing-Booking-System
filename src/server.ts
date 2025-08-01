import express, { Application } from "express";
import dotenv from "dotenv";
import userRouter from "./users/user.route"; 
import eventRouter from "./events/events.route";
import bookingRouter from "./bookings/booking.route";
import supportTicketRouter from "./supports/supportTicket.route";
import venueRouter from "./venues/venues.route";
import authRouter from "./auth/auth.route";
import { rateLimiterMiddleware } from "./middleware/rateLimiter";
import { swaggerDocs } from './config/swaggarConfig';
import paymentRouter from "./payments/payments.route";
import darajaRouter from "./darajaPayments/daraja.route";
// import ticketReplyRouter from "./ticketsReply/TicketsReply.route";
import cors from 'cors'
import ticketRouter from "./tickets/ticket.route";


dotenv.config();

const app: Application = express();

// Built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//  Correct usage of rate limiter (must pass the actual function, not a string)
// app.use(rateLimiterMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to Express + TypeScript Backend");
});

// Routers
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/support", supportTicketRouter);
app.use("/api/venues", venueRouter);
app.use("/api", authRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/darajaPayments", darajaRouter);
// app.use("/api", ticketReplyRouter);
app.use("/api/tickets", ticketRouter); 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  //swaggerDocs(app, PORT);
});


