import { atom } from "recoil";

export const otpLoginAtom = atom<boolean>({
  key: "otpAtom",
  default: false,
});
