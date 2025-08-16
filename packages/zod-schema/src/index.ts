import {
  SigninInput,
  SignupInput,
  signupSchema,
  signinSchema,
} from "./schema/authSchema";

// Re-export
export { signupSchema, signinSchema };
export type { SignupInput, SigninInput };
