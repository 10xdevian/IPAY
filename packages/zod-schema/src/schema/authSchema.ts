import { z } from "zod";

const phoneRegex = /^[0-9]{10}$/;
const numericOnly = /^[0-9]+$/;

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "username must be at least 3 characters")
    .refine((val) => !phoneRegex.test(val), {
      message: "Username cannot be a phone number",
    })
    .refine((val) => !numericOnly.test(val), {
      message: "Username cannot be only numbers",
    })
    .refine((val) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Username cannot be an email",
    }),
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  number: z
    .string()
    .min(10, "Phone Number must be at least 10 Digits")
    .max(14, "Must be a valid mobile number")
    .regex(phoneRegex, "Must be a valid phone number with 10 digits"),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "You must accept terms"),
});
export const signinSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
