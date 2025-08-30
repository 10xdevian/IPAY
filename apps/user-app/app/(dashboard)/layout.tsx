import SessionGuard from "../../components/auth/SessionGuard";
import Sidebar from "../../components/dashboard/Sidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import { getUserWithDetails } from "../lib/userService";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserWithDetails();

  if (!user) {
    return <div>Loading....</div>;
  }

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
