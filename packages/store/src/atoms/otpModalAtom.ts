import { atom } from "recoil";

export const otpModalAtom = atom<boolean>({
  key: "otpModalAtom",
  default: false,
});
