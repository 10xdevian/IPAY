import { getServerSession } from "next-auth";
import SessionGuard from "../../components/auth/SessionGuard";
import Sidebar from "../../components/dashboard/Sidebar";
import { authOptions } from "../lib/authOption";
import db from "@repo/db/client";
import InteractiveButton from "../../components/ui/InteractiveButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  let user = null;
  if (session?.user?.id) {
    user = await db.user.findUnique({
      where: { id: Number(session.user.id) }, // ✅ convert to Int
      include: {
        OnRampTransaction: true,
        Balance: true,
      },
    });
  }

  return (
    <SessionGuard>
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-4">
          <Sidebar />
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 bg-gray-50 p-6">
          <div className="flex justify-between ">
            <InteractiveButton variant="secondary"  href="/home">Back</InteractiveButton>
            <h1 className="text-3xl font-bold"></h1>

            <InteractiveButton variant="secondary"  href="/your-account">{user?.username ?? "User"}</InteractiveButton>
          </div>
          {children}
        </main>
      </div>
    </SessionGuard>
  );
}
