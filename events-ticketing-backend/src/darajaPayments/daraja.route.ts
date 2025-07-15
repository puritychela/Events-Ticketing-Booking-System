// routes/payment.route.ts
import { Router } from "express";
import { payForBooking } from "./daraja.controller";

const darajaRouter = Router();

darajaRouter.post("/stkpush", payForBooking);

export default darajaRouter;
