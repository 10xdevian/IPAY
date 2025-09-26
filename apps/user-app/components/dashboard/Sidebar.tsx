"use client";

import { usePathname } from "next/navigation";
import InteractiveButton from "../ui/InteractiveButton";
import { ArrowLeftRight, House, Send } from "lucide-react";

const navItems = [
  { name: "Home", href: "/home", icon: House },
   { name: "Add Money", href: "/add-money", icon: Send },
  { name: "P2P Transfer", href: "/send", icon: Send },
  { name: "Transactions", href: "/transactions", icon: ArrowLeftRight },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="space-y-2">
      <InteractiveButton
        href="/home"
        variant="logo"
        asButton={false}
        className="text-black mb-10 justify-center items-center"
      >
        <div className="flex gap-2">
          🐍
          <h1 className="text-4xl">Ipay</h1>
        </div>
      </InteractiveButton>

      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <InteractiveButton
            className={`w-full gap-2 ${isActive ? "bg-green-100" : ""}`}
            variant="secondary"
            href={item.href}
          >
            <div className="flex items-center gap-3 text-xl pr-[3rem] py-1">
              <Icon size={20} />
              <span>{item.name}</span>
            </div>
          </InteractiveButton>
        );
      })}
    </nav>
  );
}
