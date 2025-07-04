import { Request, Response, NextFunction } from "express";
import {
  createUserServices,
  deleteUserServices,
  getUserByIdServices,
  getUsersServices,
  updateUserServices,
} from "./user.service";

// GET all users
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await getUsersServices();
    if (!allUsers || allUsers.length === 0) {
       res.status(404).json({ message: "No users found" });
       return;
    }
     res.status(200).json(allUsers);
     return;
  } catch (error) {
    return next(error);
  }
};

// GET user by ID
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }

  try {
    const user = await getUserByIdServices(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return ;
    }
     res.status(200).json(user);
     return;
  } catch (error) {
    return next(error);
  }
};

// CREATE user
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { firstname, lastname, email, password, contactPhone, address, role } = req.body;

  if (!firstname || !lastname || !email || !password) {
     res.status(400).json({ error: "Firstname, lastname, email, and password are required" });
     return;
  }

  try {
    const newUser = await createUserServices({
      firstname,
      lastname,
      email,
      password,
      contactPhone,
      address,
      role: role || "user",
    });

    if (!newUser) {
      res.status(500).json({ message: "Failed to create user" });
      return;
    }

   res.status(201).json(newUser);
   return;
  } catch (error) {
    return next(error);
  }
};

// UPDATE user
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }

  const { firstname, lastname, email, password, contactPhone, address, role } = req.body;

  if (!firstname || !lastname || !email || !password) {
    res.status(400).json({ error: "Firstname, lastname, email, and password are required" });
    return;
  }

  try {
    const updatedUser = await updateUserServices(userId, {
      firstname,
      lastname,
      email,
      password,
      contactPhone,
      address,
      role,
    });

    if (!updatedUser) {
      res.status(404).json({ message: "User not found or failed to update" });
      return;
    }

   res.status(200).json(updatedUser);
   return;
  } catch (error) {
    return next(error);
  }
};

// DELETE user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
   res.status(400).json({ error: "Invalid user ID" });
   return;
  }

  try {
    const deletedUser = await deleteUserServices(userId);
    if (!deletedUser) {
     res.status(404).json({ message: "User not found" });
     return;
    }

   res.status(200).json({ message: "User deleted successfully" });
   return;
  } catch (error) {
    return next(error);
  }
};


