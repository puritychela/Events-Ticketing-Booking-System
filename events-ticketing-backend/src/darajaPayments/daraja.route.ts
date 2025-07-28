
import { Router } from "express";
import { mpesaCallbackHandler , payForBooking } from "./daraja.controller";

const darajaRouter = Router();

darajaRouter.post("/stkpush", payForBooking);
darajaRouter.post("/callback", mpesaCallbackHandler );

export default darajaRouter;


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




