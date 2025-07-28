"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const daraja_controller_1 = require("./daraja.controller");
const darajaRouter = (0, express_1.Router)();
darajaRouter.post("/stkpush", daraja_controller_1.payForBooking);
darajaRouter.post("/callback", daraja_controller_1.mpesaCallbackHandler);
exports.default = darajaRouter;
// daraja.route.ts
// import { Router } from "express";
// import { payForBooking } from "./daraja.controller";
// const darajaRouter = Router();
// darajaRouter.post("/stkpush", payForBooking);
// export default darajaRouter;
// import express from "express";
// import { payForBooking } from "./daraja.controller";
// const router = express.Router();
// // POST /api/daraja/stkpush
// router.post("/stkpush", payForBooking);
// export default router;
