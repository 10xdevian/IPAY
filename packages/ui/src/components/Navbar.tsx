import React, { ReactNode } from "react";

interface NavbarProps {
  leftItems: ReactNode;
  rightItems: ReactNode;
  className?: string;
}

export const Navbar = ({ leftItems, rightItems, className }: NavbarProps) => {
  return (
    <div
      className={`flex justify-between w-full  ${className || ""}`}
    >
      <div className="flex gap-2">{leftItems}</div>
      <div className="flex gap-2">{rightItems}</div>
    </div>
  );
};
