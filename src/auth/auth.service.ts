//register a new user

import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TUserInsert, TUserSelect, user } from "../drizzle/schema";


// Create user
export const createUserServices = async (
  newUser: TUserInsert
): Promise<String> => {
  await db.insert(user).values(newUser).returning();
  return "User Created successfully";
};

//get user by email
export const getUserByEmailService = async(email:string):Promise<TUserSelect | undefined> =>{
  return await db.query.user.findFirst({
    where:(eq(user.email,email))
  })
}


// export const generateResetToken = async (email: string): Promise<string> => {
//   const token = crypto.randomBytes(32).toString("hex");
//   const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

//   await db.update(user)
//     .set({ resetToken: token, resetTokenExpiry: expiry })
//     .where(eq(user.email, email));

//   return token;
// };