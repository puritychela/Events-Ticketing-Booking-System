import { Router } from "express";
import {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from "./payments.controller";


const paymentRouter = Router();

// Base path: /api/users (from server.ts)
paymentRouter.get("/", getPayments); 
paymentRouter.get("/:id", getPaymentById); 
paymentRouter.post("/", createPayment); 
paymentRouter.put("/:id", updatePayment); 
paymentRouter.delete("/:id", deletePayment); 

export default paymentRouter;