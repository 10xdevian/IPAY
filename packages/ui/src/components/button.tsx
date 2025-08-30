import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "link"
  | "logo"
  | "danger";

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
    "text-sm bg-lime-300 hover:bg-lime-400 hover:transition delay-150 duration-300 ease-in-out font-semibold rounded-full px-4 py-1.5 w-full flex justify-center ",
  secondary:
    "text-sm  hover:bg-green-50 transition delay-150 duration-300 ease-in-out font-semibold rounded-full px-4 py-1.5 w-full ",
  outline:
    "border border-green-900 hover:border-none text-black-900 hover:bg-lime-400 hover:transition delay-150 duration-300 ease-in-out rounded-full  focus:ring-2 focus:ring-green-200  text-sm px-4 py-1.5 w-full ",
  link: "text-blue-600 hover:underline hover:text-blue-800 text-sm font-medium p-1 underline",
  logo: "text-black text-4xl uppercase",
  danger:
    "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
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
      className={`${variantClass} ${className} flex items-center py-3 px-5 ${
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
