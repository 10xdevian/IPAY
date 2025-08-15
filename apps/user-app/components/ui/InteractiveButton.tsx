"use client";
import { Button } from "@repo/ui";
import Link from "next/link";
import React, { ReactNode } from "react";

interface InteractiveButtonProps {
  href?: string;
  children?: ReactNode;
  variant?: "primary" | "secondary" | "link";
  className?: string;
  onClick?: () => void;
  asButton?: boolean;
}

const variantClasses: Record<string, string> = {
  primary:
    "focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 flex justify-center text-center items-center  ",
  secondary:
    "text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5",
  link: "text-blue-600 hover:underline hover:text-blue-800",
};

function InteractiveButton({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  asButton = true,
}: InteractiveButtonProps) {
  const styles = `${variantClasses[variant]} ${className}`.trim();
  if (!asButton && href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <Button variant={variant} className={className} onClick={onClick}>
      {children}
    </Button>
  );
}

export default InteractiveButton;
