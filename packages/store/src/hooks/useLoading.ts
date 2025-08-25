import { useRecoilState } from "recoil";
import { loadingAtom } from "../atoms/loadingAtom";

export const useLoading = () => {
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  return { loading, startLoading, stopLoading };
};
