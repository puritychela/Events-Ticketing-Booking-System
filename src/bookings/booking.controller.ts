import { Request, Response, NextFunction } from "express";
import {
  getAllBookingsService,
  getBookingByIdService,
  createBookingService,
  updateBookingService,
  deleteBookingService,
} from "./booking.service";

// ✅ GET /api/bookings
export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await getAllBookingsService();
    res.status(200).json(bookings);
    return;
  } catch (err) {
    next(err);
    return;
  }
};

// ✅ GET /api/bookings/user/me
export const getMyBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized – user not authenticated" });
      return;
    }

    const bookings = await getAllBookingsService({ userId: String(userId) });
    res.status(200).json(bookings);
    return;
  } catch (err) {
    next(err);
    return;
  }
};

// ✅ GET /api/bookings/:id
export const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid booking ID" });
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
    next(err);
    return;
  }
};

// ✅ POST /api/bookings
export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    const { eventId, quantity } = req.body;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized – user not authenticated" });
      return;
    }

    const parsedEventId = Number(eventId);
    const parsedQuantity = Number(quantity);

    if (!parsedEventId || isNaN(parsedEventId)) {
      res.status(400).json({ message: "Valid eventId is required" });
      return;
    }

    if (!parsedQuantity || isNaN(parsedQuantity) || parsedQuantity <= 0) {
      res.status(400).json({ message: "Valid quantity is required" });
      return;
    }

    const newBooking = await createBookingService({
      userId,
      eventId: parsedEventId,
      quantity: parsedQuantity,
      bookingStatus: "Pending",
    });

    res.status(201).json(newBooking);
    return;
  } catch (err) {
    next(err);
    return;
  }
};

// ✅ PUT /api/bookings/:id
export const updateBooking = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid booking ID" });
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
    next(err);
    return;
  }
};

// ✅ DELETE /api/bookings/:id
export const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid booking ID" });
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
    next(err);
    return;
  }
};
