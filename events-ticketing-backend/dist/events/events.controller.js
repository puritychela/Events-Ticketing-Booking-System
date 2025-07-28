"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEventById = exports.getEvents = void 0;
const events_service_1 = require("./events.service");
// ✅ GET /api/events (supports search, category, venueId, eventType, accessLevel)
const getEvents = async (req, res, next) => {
    try {
        const { search, category, venueId, eventType, accessLevel } = req.query;
        const filters = {
            search: search,
            category: category,
            venueId: venueId ? parseInt(venueId) : undefined,
            eventType: eventType,
            accessLevel: accessLevel,
        };
        const events = await (0, events_service_1.getAllEventsService)(filters);
        if (!events || events.length === 0) {
            res.status(404).json({ message: "No events found" });
            return;
        }
        res.status(200).json(events);
    }
    catch (error) {
        next(error);
    }
};
exports.getEvents = getEvents;
// ✅ GET /api/events/:id
const getEventById = async (req, res, next) => {
    const eventId = parseInt(req.params.id);
    if (isNaN(eventId)) {
        res.status(400).json({ error: "Invalid event ID" });
        return;
    }
    try {
        const event = await (0, events_service_1.getEventByIdService)(eventId);
        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }
        res.status(200).json(event);
    }
    catch (error) {
        next(error);
    }
};
exports.getEventById = getEventById;
// ✅ POST /api/events
const createEvent = async (req, res, next) => {
    try {
        const newEvent = await (0, events_service_1.createEventService)(req.body);
        res.status(201).json(newEvent);
    }
    catch (error) {
        next(error);
    }
};
exports.createEvent = createEvent;
// ✅ PUT /api/events/:id
const updateEvent = async (req, res, next) => {
    const eventId = parseInt(req.params.id);
    if (isNaN(eventId)) {
        res.status(400).json({ error: "Invalid event ID" });
        return;
    }
    try {
        const updatedEvent = await (0, events_service_1.updateEventService)(eventId, req.body);
        res.status(200).json(updatedEvent);
    }
    catch (error) {
        next(error);
    }
};
exports.updateEvent = updateEvent;
// ✅ DELETE /api/events/:id
const deleteEvent = async (req, res, next) => {
    const eventId = parseInt(req.params.id);
    if (isNaN(eventId)) {
        res.status(400).json({ error: "Invalid event ID" });
        return;
    }
    try {
        await (0, events_service_1.deleteEventService)(eventId);
        res.status(200).json({ message: "Event deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteEvent = deleteEvent;
