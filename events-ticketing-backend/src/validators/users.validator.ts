import { z } from "zod";

// Create User
export const createUserSchema = z.object({
  firstname: z.string().min(3, "Firstname is required"),
  lastname: z.string().min(3, "Lastname is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  role: z.enum(["admin", "user"]).optional()
});

// Update User
export const updateUserSchema = z.object({
  firstname: z.string().min(2).optional(),
  lastname: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  role: z.enum(["admin", "user"]).optional()
});

// Login Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password is required")
});
