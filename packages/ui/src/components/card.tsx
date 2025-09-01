import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | string;
  className?: string;
  title?: string;
}

const variantBg: Record<string, string> = {
  primary: "bg-[#ffffff]",
  secondary: "bg-red-700",
};

export function Card({
  children,
  onClick,
  variant = "primary",
  className = "",
  title,
}: CardProps) {
  const variantClass = variantBg[variant] || variantBg["secondary"];
  return (
    <div
      className={`${variantClass} p-2  rounded-md ${className}`}
      onClick={onClick}
    >
      <h1 className="font-bold">{title}</h1>
      {children}
    </div>
  );
}
