import { atom } from "recoil";

export const authErrorAtom = atom<string | null>({
  key: "authError",
  default: null,
});