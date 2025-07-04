import { Request, Response, NextFunction } from "express";
import {
  createPaymentService,
  getAllPaymentsService,
  getPaymentByIdService,
  updatePaymentService,
  deletePaymentService,
} from "./payments.service";

// GET all payments
export const getPayments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payments = await getAllPaymentsService();
    if (!payments || payments.length === 0) {
      res.status(404).json({ message: "No payments found" });
      return;
    }
    res.status(200).json(payments);
    return;
  } catch (error) {
    next(error);
  }
};

// GET payment by ID
export const getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid payment ID" });
    return;
  }

  try {
    const payment = await getPaymentByIdService(id);
    if (!payment) {
      res.status(404).json({ message: "Payment not found" });
      return;
    }
    res.status(200).json(payment);
    return;
  } catch (error) {
    next(error);
  }
};

// CREATE payment
export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
  const { bookingId, amount, paymentStatus, paymentMethod, transactionId } = req.body;

  if (!bookingId || !amount || !paymentMethod || !transactionId) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const newPayment = await createPaymentService({
      bookingId,
      amount,
      paymentStatus,
      paymentMethod,
      transactionId,
    });

    res.status(201).json(newPayment);
    return;
  } catch (error) {
    next(error);
  }
};

// UPDATE payment
export const updatePayment = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid payment ID" });
    return;
  }

  try {
    const updatedCount = await updatePaymentService(id, req.body);
    if (updatedCount === 0) {
      res.status(404).json({ message: "Payment not found" });
      return;
    }

    res.status(200).json({ message: "Payment updated successfully" });
    return;
  } catch (error) {
    next(error);
  }
};

// DELETE payment
export const deletePayment = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid payment ID" });
    return;
  }

  try {
    const deletedCount = await deletePaymentService(id);
    if (deletedCount === 0) {
      res.status(404).json({ message: "Payment not found" });
      return;
    }

    res.status(200).json({ message: "Payment deleted successfully" });
    return;
  } catch (error) {
    next(error);
  }
};
