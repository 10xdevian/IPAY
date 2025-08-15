import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const variantButton: Record<string, string> = {
  default:
    "px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200",
  primary:
    "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5",
  secondary:
    "text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5",
};

export const Button = ({
  onClick,
  children,
  variant = "default", // fallback if not provided
  className = "",
  type,
}: ButtonProps) => {
  const variantClass = variantButton[variant] || variantButton["default"];

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${variantClass} ${className}`}
    >
      {children}
    </button>
  );
};
