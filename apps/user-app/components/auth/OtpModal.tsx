import { useOtpModal } from "@repo/store";
import React from "react";

interface OtpModalProps {
  otpValue: string;
  setOtpValue: (val: string) => void;
  onVerify: () => void;
}

function OtpModal({ otpValue, setOtpValue, onVerify }: OtpModalProps) {
  const { isOpenModal, closeModal } = useOtpModal();

  if (!isOpenModal) {
    return null;
  }

  return (
    
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={closeModal} // close if click outside
      >
        <div
          className="bg-white p-6 rounded w-80"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
          <input
            type="text"
            value={otpValue}
            onChange={(e) => setOtpValue(e.target.value)}
            className="border p-2 rounded w-full mb-4"
            placeholder="Enter OTP"
          />
          <button
            onClick={onVerify}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Verify OTP
          </button>
          <button
            onClick={closeModal}
            className="mt-2 text-sm text-gray-500 underline w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    
  );
}

export default OtpModal;
