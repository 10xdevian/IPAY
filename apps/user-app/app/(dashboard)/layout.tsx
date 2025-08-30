import { getServerSession } from "next-auth";
import SessionGuard from "../../components/auth/SessionGuard";
import Sidebar from "../../components/dashboard/Sidebar";
import { authOptions } from "../lib/authOption";
import db from "@repo/db/client";
import InteractiveButton from "../../components/ui/InteractiveButton";
import Image from "next/image";
import profileImage from "../../../../assets/profile.png";
import { headers } from "next/headers";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  let user = null;
  if (session?.user?.id) {
    user = await db.user.findUnique({
      where: { id: Number(session.user.id) },
      include: {
        OnRampTransaction: true,
        Balance: true,
        kyc: true,
      },
    });
  }

  // Get the current path
  const pathname = headers().get("next-url") ?? ""; // fallback just in case

  const isHomePage = pathname === "/home"; // or use startsWith("/home") if needed

  return (
    <SessionGuard>
      <div className="flex min-h-screen p-10">
        {/* Left Sidebar */}
        <aside className="w-[20rem]  p-4">
          <Sidebar />
        </aside>

        {/* Right Content Area */}
        <main className="flex-1  p-6">
          <DashboardHeader user={user} />
          {children}
        </main>
      </div>
    </SessionGuard>
  );
}
