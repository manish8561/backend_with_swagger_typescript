import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
});

export type UserSchema = z.infer<typeof userSchema>;
