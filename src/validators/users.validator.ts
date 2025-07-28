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



export const userUpdateSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  profilepicture: z.string().url().optional(), // Make sure it's optional
});




// Login Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password is required")
});
