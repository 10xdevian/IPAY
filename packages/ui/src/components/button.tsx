import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "link" | "logo";

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean; // ✅ new prop
}

const variantButton: Record<string, string> = {
  primary:
    "text-sm bg-lime-300 hover:bg-lime-400 hover:transition delay-150 duration-300 ease-in-out font-semibold rounded-full px-4 py-1.5 w-full ",
  secondary:
    "text-sm  hover:bg-gray-100 transition delay-150 duration-300 ease-in-out font-semibold rounded-full px-4 py-1.5 w-full ",
  outline:
    "border border-green-900 hover:border-none text-black-900 hover:bg-lime-400 hover:transition delay-150 duration-300 ease-in-out rounded-full  focus:ring-2 focus:ring-green-200  text-sm px-4 py-1.5 w-full ",
  link: "text-blue-600 hover:underline hover:text-blue-800 text-sm font-medium px-4 py-1.5",
  logo: "text-black text-4xl uppercase",
};

export const Button = ({
  onClick,
  children,
  variant = "primary", // fallback if not provided
  className = "",
  type,
  disabled,
  isLoading,
}: ButtonProps) => {
  const variantClass = variantButton[variant] || variantButton["default"];

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${variantClass} ${className} flex items-center justify-center ${
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      disabled={disabled || isLoading} // ✅ block clicks while loading
    >
      {/* ✅ spinner */}
      {children}
      {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
    </button>
  );
};
