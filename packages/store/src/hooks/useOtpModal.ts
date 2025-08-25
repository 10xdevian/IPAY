import { useRecoilState } from "recoil";
import { otpModalAtom } from "../atoms/otpModalAtom";

export const useOtpModal = () => {
  const [isOpenModal, setIsOpenModal] = useRecoilState(otpModalAtom);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return { isOpenModal, openModal, closeModal };
};
