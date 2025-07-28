"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketById = exports.getTicketsByUser = exports.createTicket = void 0;
const ticketService = __importStar(require("../tickets/ticket.service"));
/**
 * Issue a new ticket after successful booking/payment
 */
const createTicket = async (req, res) => {
    const { bookingId, eventId, userId, seatNumber } = req.body;
    if (!bookingId || !eventId || !userId) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        const ticket = await ticketService.issueTicket({
            bookingId,
            eventId,
            userId,
            seatNumber,
        });
        res.status(201).json(ticket);
        return;
    }
    catch (error) {
        console.error("Ticket creation failed:", error);
        res.status(500).json({ message: "Failed to create ticket" });
        return;
    }
};
exports.createTicket = createTicket;
/**
 * Get all tickets for a specific user
 */
const getTicketsByUser = async (req, res) => {
    const userId = Number(req.params.userId);
    if (!userId) {
        res.status(400).json({ message: "Invalid user ID" });
        return;
    }
    try {
        const tickets = await ticketService.getTicketsByUserId(userId);
        res.json(tickets);
        return;
    }
    catch (error) {
        console.error("Failed to fetch tickets:", error);
        res.status(500).json({ message: "Failed to fetch tickets" });
        return;
    }
};
exports.getTicketsByUser = getTicketsByUser;
/**
 * Get a single ticket by ticketId
 */
const getTicketById = async (req, res) => {
    const ticketId = Number(req.params.ticketId);
    if (!ticketId) {
        res.status(400).json({ message: "Invalid ticket ID" });
        return;
    }
    try {
        const ticket = await ticketService.getTicketById(ticketId);
        if (!ticket) {
            res.status(404).json({ message: "Ticket not found" });
            return;
        }
        res.json(ticket);
        return;
    }
    catch (error) {
        console.error("Error getting ticket:", error);
        res.status(500).json({ message: "Failed to get ticket" });
        return;
    }
};
exports.getTicketById = getTicketById;
