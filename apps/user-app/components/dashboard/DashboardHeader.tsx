"use client";
import { usePathname } from "next/navigation";
import React from "react";
import InteractiveButton from "../ui/InteractiveButton";
import Image from "next/image";
import profileImage from "../../../../assets/profile.png";

function DashboardHeader({ user }: { user: any }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/home";

  return (
    <div className="flex justify-between items-center">
      {/* LEFT SIDE */}
      {isHomePage ? (
        <div className="">
          <h1 className="text-3xl font-bold">
            Hy
            <span className="text-gray-500 p-1">{user?.kyc?.fullName}</span>
            👋🏻
          </h1>
          <span className="text-sm text-gray-500">
            Welcome back to your financial dashboard
          </span>
        </div>
      ) : (
        <InteractiveButton variant="secondary" href="/home">
          <h1 className="text-xl p-2 px-9">Back</h1>
        </InteractiveButton>
      )}

      {/* RIGHT SIDE (Profile button always) */}
      <InteractiveButton variant="secondary" href="/your-account">
        <div className="flex gap-1.5 items-center px-3">
          <div className="w-[3rem] h-[3rem] rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
            <Image
              src={user?.kyc?.profileImageUrl ?? profileImage}
              width={48}
              height={48}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          {!isHomePage && ( // Only show name on non-home pages
            <h1 className="text-lg">{user?.kyc?.fullName ?? "User"}</h1>
          )}
        </div>
      </InteractiveButton>
    </div>
  );
}

export default DashboardHeader;
