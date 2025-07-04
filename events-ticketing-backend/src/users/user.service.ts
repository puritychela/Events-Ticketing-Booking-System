// src/users/user.service.ts
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { user, TUserInsert, TUserSelect } from "../drizzle/schema";

// Get all users
export const getUsersServices = async (): Promise<TUserSelect[]> => {
  return await db.query.user.findMany();
};

// Get user by ID
export const getUserByIdServices = async (userId: number): Promise<TUserSelect | undefined> => {
  return await db.query.user.findFirst({
    where: eq(user.userId, userId),
  });
};

// Create user
export const createUserServices = async (
  newUser:TUserInsert
): Promise<string> => {
  await db.insert(user).values(newUser).returning();
  return "user Created Successfully";
};

// Update user
export const updateUserServices = async (
  userId: number,
  updatedUser: Partial<Omit<TUserInsert, "userId">>
): Promise<TUserSelect | undefined> => {
  const [updated] = await db
    .update(user)
    .set(updatedUser)
    .where(eq(user.userId, userId))
    .returning();
  return updated;
};

// Delete user
export const deleteUserServices = async (userId: number): Promise<TUserSelect | undefined> => {
  const [deleted] = await db
    .delete(user)
    .where(eq(user.userId, userId))
    .returning();
  return deleted;
};

