"use client";
import { Button } from "@repo/ui";
import Link from "next/link";
import React, { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "link" | "logo";

interface InteractiveButtonProps {
  href?: string;
  children?: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  asButton?: boolean;
}

function InteractiveButton({
  href,
  children,
  variant = "primary",
  className,
  onClick,
}: InteractiveButtonProps) {
  if (href) {
    return (
      <Link href={href} className="">
        <Button variant={variant} className={className}>
          {children}
        </Button>
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
