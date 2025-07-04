 import { Router } from "express";
import { createUser, loginUser } from "./auth.controller";
 const authRouter = Router();

 authRouter.post('/auth/register', createUser)
 authRouter.post('/auth/login',loginUser)

 export default authRouter;