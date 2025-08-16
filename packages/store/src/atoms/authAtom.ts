import { atom } from "recoil";

export type AuthErrorType = Record<string, string | null>; // { email: "Invalid", password: null }

export const authErrorAtom = atom<AuthErrorType>({
  key: "authErrorAtom",
  default: {},
});
