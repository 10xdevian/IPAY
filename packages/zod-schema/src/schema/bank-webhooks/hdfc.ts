import { z } from "zod";

export const hdfcWebhookSchema = z.object({
  token: z.any().superRefine((val, ctx) => {
    if (typeof val !== "string") {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: "string",
        received: typeof val,
        message: "Token must be a string",
      });
      return; // stop further checks for token type invalid
    }
    if (val.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Token is required",
      });
    }
  }),

  user_identifier: z.any().superRefine((val, ctx) => {
    if (typeof val !== "string") {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: "string",
        received: typeof val,
        message: "User Identifier must be a string",
      });
      return;
    }
    if (val.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "User Identifier is required",
      });
    }
  }),

  amount: z.any().superRefine((val, ctx) => {
    if (typeof val !== "number") {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: "number",
        received: typeof val,
        message: "Amount must be a number",
      });
      return;
    }
    if (val <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Amount must be greater than 0",
      });
    }
  }),
});

export type HdfcWebhookInput = z.infer<typeof hdfcWebhookSchema>;
