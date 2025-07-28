"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVenue = exports.updateVenue = exports.createVenue = exports.getVenueById = exports.getAllVenues = void 0;
const venues_service_1 = require("./venues.service");
// GET all venues
const getAllVenues = async (req, res, next) => {
    try {
        const venues = await (0, venues_service_1.getAllVenuesService)();
        res.status(200).json(venues);
        return;
    }
    catch (error) {
        return next(error);
    }
};
exports.getAllVenues = getAllVenues;
// GET venue by ID
const getVenueById = async (req, res, next) => {
    const venueId = parseInt(req.params.id);
    if (isNaN(venueId)) {
        res.status(400).json({ error: "Invalid venue ID" });
        return;
    }
    try {
        const venue = await (0, venues_service_1.getVenueByIdService)(venueId);
        if (!venue) {
            res.status(404).json({ message: "Venue not found" });
            return;
        }
        res.status(200).json(venue);
        return;
    }
    catch (error) {
        return next(error);
    }
};
exports.getVenueById = getVenueById;
// CREATE a venue
const createVenue = async (req, res, next) => {
    const { name, address, capacity } = req.body;
    if (!name || !address || !capacity) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }
    try {
        const newVenue = await (0, venues_service_1.createVenueService)({ name, address, capacity });
        res.status(201).json(newVenue);
        return;
    }
    catch (error) {
        return next(error);
    }
};
exports.createVenue = createVenue;
// UPDATE a venue
const updateVenue = async (req, res, next) => {
    const venueId = parseInt(req.params.id);
    if (isNaN(venueId)) {
        res.status(400).json({ error: "Invalid venue ID" });
        return;
    }
    const { name, address, capacity } = req.body;
    try {
        const updatedVenue = await (0, venues_service_1.updateVenueService)(venueId, { name, address, capacity });
        if (!updatedVenue.length) {
            res.status(404).json({ message: "Venue not found" });
            return;
        }
        res.status(200).json(updatedVenue);
        return;
    }
    catch (error) {
        return next(error);
    }
};
exports.updateVenue = updateVenue;
// DELETE a venue
const deleteVenue = async (req, res, next) => {
    const venueId = parseInt(req.params.id);
    if (isNaN(venueId)) {
        res.status(400).json({ error: "Invalid venue ID" });
        return;
    }
    try {
        const deleted = await (0, venues_service_1.deleteVenueService)(venueId);
        if (!deleted) {
            res.status(404).json({ message: "Venue not found" });
            return;
        }
        res.status(200).json({ message: "Venue deleted successfully" });
        return;
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteVenue = deleteVenue;
