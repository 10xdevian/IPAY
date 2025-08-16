import { atom } from "recoil";

export type AuthErrorType = Record<string, string | null> & {
  general?: string;
};

export const authErrorAtom = atom<AuthErrorType>({
  key: "authErrorAtom",
  default: {},
});
