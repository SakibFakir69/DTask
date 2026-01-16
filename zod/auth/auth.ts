import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  pin: z.string().length(4, "PIN must be exactly 4 digits").regex(/^\d+$/, "Only numbers allowed"),
});



export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export type SignUpFormData = z.infer<typeof signUpSchema>;