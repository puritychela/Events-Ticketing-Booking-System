import { Request, Response, NextFunction } from "express";
import {
  getAllBookingsService,
  getBookingByIdService,
  createBookingService,
  updateBookingService,
  deleteBookingService,
} from "./booking.service";

// ✅ GET /api/bookings – Admin or all bookings
export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await getAllBookingsService();
    res.status(200).json(bookings);
    return;
  } catch (err) {
    return next(err);
  }
};

// ✅ GET /api/bookings/user/me – Current user's bookings
export const getMyBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized – user not authenticated" });
      return;
    }

    const bookings = await getAllBookingsService({ userId });

    res.status(200).json(bookings);
    return;
  } catch (err) {
    return next(err);
  }
};

// ✅ GET /api/bookings/:id
export const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid booking ID" });
    return;
  }

  try {
    const booking = await getBookingByIdService(id);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    res.status(200).json(booking);
    return;
  } catch (err) {
    return next(err);
  }
};

// ✅ POST /api/bookings
export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const { eventId } = req.body;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized – user not authenticated" });
      return;
    }

    if (!eventId || isNaN(Number(eventId))) {
      res.status(400).json({ message: "Valid eventId is required" });
      return;
    }

    const newBooking = await createBookingService({
      userId,
      eventId: Number(eventId),
      bookingStatus: "Pending",
    });

    res.status(201).json(newBooking);
    return;
  } catch (err) {
    return next(err);
  }
};

// ✅ PUT /api/bookings/:id
export const updateBooking = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid booking ID" });
    return;
  }

  try {
    const updatedCount = await updateBookingService(id, req.body);
    if (updatedCount === 0) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    res.status(200).json({ message: "Booking updated successfully" });
    return;
  } catch (err) {
    return next(err);
  }
};

// ✅ DELETE /api/bookings/:id
export const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid booking ID" });
    return;
  }

  try {
    const deletedCount = await deleteBookingService(id);
    if (deletedCount === 0) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    res.status(200).json({ message: "Booking deleted successfully" });
    return;
  } catch (err) {
    return next(err);
  }
};
