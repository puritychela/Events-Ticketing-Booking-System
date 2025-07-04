import { Request, Response, NextFunction } from "express";
import {
  getAllBookingsService,
  getBookingByIdService,
  createBookingService,
  updateBookingService,
  deleteBookingService,
} from "./booking.service";

export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await getAllBookingsService();
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

export const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) 
    res.status(400).json({ error: "Invalid booking ID" });
return ;
  try {
    const booking = await getBookingByIdService(id);
    if (!booking) 
     res.status(404).json({ message: "Booking not found" });
    return;
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newBooking = await createBookingService(req.body);
    res.status(201).json(newBooking);
  } catch (err) {
    next(err);
  }
};

export const updateBooking = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) 
    res.status(400).json({ error: "Invalid booking ID" });
return;

  try {
    const updatedCount = await updateBookingService(id, req.body);
    if (updatedCount === 0) 
     res.status(404).json({ message: "Booking not found" });
    return;
    res.status(200).json({ message: "Booking updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id))
     res.status(400).json({ error: "Invalid booking ID" });
    return;

  try {
    const deletedCount = await deleteBookingService(id);
    if (deletedCount === 0) res.status(404).json({ message: "Booking not found" });
    return;
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    next(err);
  }
};
