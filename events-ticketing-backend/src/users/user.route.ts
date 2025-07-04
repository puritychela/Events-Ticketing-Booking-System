import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./user.controller";
import { adminRoleAuth } from "../middleware/bearAuth";

const userRouter = Router();

// Base path: /api/users (from server.ts)
userRouter.get("/",adminRoleAuth, getUsers); 
userRouter.get("/:id",adminRoleAuth, getUserById); 
userRouter.post("/", createUser); 
userRouter.put("/:id", updateUser); 
userRouter.delete("/:id",adminRoleAuth, deleteUser); 

export default userRouter;






