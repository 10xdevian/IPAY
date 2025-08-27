"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/home" },
  { name: "Send", href: "/send" },
  { name: "Transactions", href: "/transactions" },
  { name: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
        <h1 className="text-4xl">IPAY</h1>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`block rounded px-4 py-2 hover:bg-gray-700 ${
            pathname === item.href ? "bg-gray-800 font-bold" : ""
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
