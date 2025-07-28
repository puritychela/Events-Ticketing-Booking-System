"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.createTicket = exports.getTicketsByUserId = exports.getTicketById = exports.getAllTickets = void 0;
const supportTicket_service_1 = require("./supportTicket.service"); // Make sure this is implemented
// GET all tickets
const getAllTickets = async (req, res, next) => {
    try {
        const tickets = await (0, supportTicket_service_1.getAllTicketsService)();
        if (!tickets || tickets.length === 0) {
            res.status(404).json({ message: "No tickets found" });
            return;
        }
        res.status(200).json(tickets);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllTickets = getAllTickets;
// GET ticket by ID
const getTicketById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ticket ID" });
        return;
    }
    try {
        const ticket = await (0, supportTicket_service_1.getTicketByIdService)(id);
        if (!ticket) {
            res.status(404).json({ message: "Ticket not found" });
            return;
        }
        res.status(200).json(ticket);
    }
    catch (error) {
        next(error);
    }
};
exports.getTicketById = getTicketById;
// ✅ GET tickets by user ID
const getTicketsByUserId = async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
    }
    try {
        const tickets = await (0, supportTicket_service_1.getTicketsByUserIdService)(userId);
        if (!tickets || tickets.length === 0) {
            res.status(404).json({ message: "No tickets found for this user" });
            return;
        }
        res.status(200).json(tickets);
    }
    catch (error) {
        next(error);
    }
};
exports.getTicketsByUserId = getTicketsByUserId;
// CREATE a new support ticket
const createTicket = async (req, res, next) => {
    const { userId, subject, description } = req.body;
    if (!userId || !subject || !description) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }
    try {
        const newTicket = await (0, supportTicket_service_1.createTicketService)({ userId, subject, description });
        res.status(201).json(newTicket);
    }
    catch (error) {
        console.error("Error creating ticket:", error);
        next(error);
    }
};
exports.createTicket = createTicket;
// UPDATE a support ticket
const updateTicket = async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ticket ID" });
        return;
    }
    try {
        const updated = await (0, supportTicket_service_1.updateTicketService)(id, req.body);
        if (updated === 0) {
            res.status(404).json({ message: "Ticket not found" });
            return;
        }
        res.status(200).json({ message: "Ticket updated successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.updateTicket = updateTicket;
// DELETE a ticket
const deleteTicket = async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ticket ID" });
        return;
    }
    try {
        const deleted = await (0, supportTicket_service_1.deleteTicketService)(id);
        if (deleted === 0) {
            res.status(404).json({ message: "Ticket not found" });
            return;
        }
        res.status(200).json({ message: "Ticket deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTicket = deleteTicket;
