import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  number: z.string(),
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
