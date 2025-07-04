import { Request, Response, NextFunction } from "express";
import {
  getAllVenuesService,
  getVenueByIdService,
  createVenueService,
  updateVenueService,
  deleteVenueService,
} from "./venues.service";

// GET all venues
export const getAllVenues = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const venues = await getAllVenuesService();
    res.status(200).json(venues);
    return;
  } catch (error) {
    return next(error);
  }
};

// GET venue by ID
export const getVenueById = async (req: Request, res: Response, next: NextFunction) => {
  const venueId = parseInt(req.params.id);
  if (isNaN(venueId)) {
    res.status(400).json({ error: "Invalid venue ID" });
    return;
  }

  try {
    const venue = await getVenueByIdService(venueId);
    if (!venue) {
      res.status(404).json({ message: "Venue not found" });
      return;
    }
    res.status(200).json(venue);
    return;
  } catch (error) {
    return next(error);
  }
};

// CREATE a venue
export const createVenue = async (req: Request, res: Response, next: NextFunction) => {
  const { name, address, capacity } = req.body;

  if (!name || !address || !capacity) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const newVenue = await createVenueService({ name, address, capacity });
    res.status(201).json(newVenue);
    return;
  } catch (error) {
    return next(error);
  }
};

// UPDATE a venue
export const updateVenue = async (req: Request, res: Response, next: NextFunction) => {
  const venueId = parseInt(req.params.id);
  if (isNaN(venueId)) {
    res.status(400).json({ error: "Invalid venue ID" });
    return;
  }

  const { name, address, capacity } = req.body;

  try {
    const updatedVenue = await updateVenueService(venueId, { name, address, capacity });
    if (!updatedVenue.length) {
      res.status(404).json({ message: "Venue not found" });
      return;
    }
    res.status(200).json(updatedVenue);
    return;
  } catch (error) {
    return next(error);
  }
};

// DELETE a venue
export const deleteVenue = async (req: Request, res: Response, next: NextFunction) => {
  const venueId = parseInt(req.params.id);
  if (isNaN(venueId)) {
    res.status(400).json({ error: "Invalid venue ID" });
    return;
  }

  try {
    const deleted = await deleteVenueService(venueId);
    if (!deleted) {
      res.status(404).json({ message: "Venue not found" });
      return;
    }
    res.status(200).json({ message: "Venue deleted successfully" });
    return;
  } catch (error) {
    return next(error);
  }
};
