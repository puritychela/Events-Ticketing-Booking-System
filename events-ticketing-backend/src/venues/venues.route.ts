import { Router } from "express";
import {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
} from "./venues.controller";

const venueRouter = Router();

venueRouter.get("/", getAllVenues);
venueRouter.get("/:id", getVenueById);
venueRouter.post("/", createVenue);
venueRouter.put("/:id", updateVenue);
venueRouter.delete("/:id", deleteVenue);

export default venueRouter;
