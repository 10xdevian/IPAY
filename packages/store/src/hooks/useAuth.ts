import { useRecoilState } from "recoil";
import { authErrorAtom } from "../atoms/authAtom";

export const useAuthError = () => {
  const [error, setError] = useRecoilState(authErrorAtom);
  return { error, setError };
};