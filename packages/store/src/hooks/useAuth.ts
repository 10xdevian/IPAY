import { useRecoilState } from "recoil";
import { authErrorAtom } from "../atoms/authAtom";

export const useAuthError = () => {
  const [error, setErrorState] = useRecoilState(authErrorAtom);

  const setError = (newError: Record<string, string | null>) => {
    setErrorState(newError);
  };

  const clearError = () => setErrorState({}); // clears all errors

  return { error, setError, clearError };
};
