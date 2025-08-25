import { useRecoilState } from "recoil";
import { otpLoginAtom } from "../atoms/otpLoginAtom";

export const useOtpLogin = () => {
  const [isOtpLogin, setIsOtpLogin] = useRecoilState(otpLoginAtom);

  const enableOtpLogin = () => setIsOtpLogin(true);
  const disableOtpLogin = () => setIsOtpLogin(false);

  return { isOtpLogin, enableOtpLogin, disableOtpLogin, setIsOtpLogin };
};
