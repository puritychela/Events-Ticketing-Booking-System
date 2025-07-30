// src/users/user.service.ts

import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { user, TUserInsert, TUserSelect } from "../drizzle/schema";

// Fetch all users
export const getUsersServices = async (): Promise<TUserSelect[]> => {
  return db.query.user.findMany();
};

// Fetch a single user by ID
export const getUserByIdServices = async (
  userId: number
): Promise<TUserSelect | undefined> => {
  return db.query.user.findFirst({
    where: eq(user.userId, userId),
  });
};

// Create a new user
export const createUserServices = async (
  newUser: TUserInsert
): Promise<TUserSelect | undefined> => {
  const [createdUser] = await db.insert(user).values(newUser).returning();
  return createdUser;
};

// Update user (admin + partial updates)
export const updateUserServices = async (
  userId: number,
  updatedData: Partial<TUserInsert>
): Promise<TUserSelect | undefined> => {
  if (!updatedData || Object.keys(updatedData).length === 0) {
    throw new Error("No data provided for update.");
  }

  const [updatedUser] = await db
    .update(user)
    .set(updatedData)
    .where(eq(user.userId, userId))
    .returning();

  return updatedUser;
};

// Update user profile (self-service)
export const updateUserProfileService = async (
  userId: number,
  profileData: {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    contactPhone?: string;
    address?: string;
    profilepicture?: string;
  }
): Promise<TUserSelect | undefined> => {
  if (!profileData || Object.keys(profileData).length === 0) {
    throw new Error("No profile data provided for update.");
  }

  const [updatedProfile] = await db
    .update(user)
    .set(profileData)
    .where(eq(user.userId, userId))
    .returning();

  return updatedProfile;
};

// Delete user
export const deleteUserServices = async (
  userId: number
): Promise<TUserSelect | undefined> => {
  const [deletedUser] = await db
    .delete(user)
    .where(eq(user.userId, userId))
    .returning();

  return deletedUser;
};
