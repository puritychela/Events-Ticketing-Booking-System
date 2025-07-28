import { Router } from "express";
import {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment, // ✅ Import the Daraja controller
} from "./payments.controller";

const paymentRouter = Router();

// Base path: /api/payments
paymentRouter.get("/", getPayments);
paymentRouter.get("/:id", getPaymentById);
paymentRouter.post("/", createPayment);
paymentRouter.put("/:id", updatePayment);
paymentRouter.delete("/:id", deletePayment);


export default paymentRouter;
