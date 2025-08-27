import { getServerSession } from "next-auth";
import SessionGuard from "../../components/auth/SessionGuard";
import Sidebar from "../../components/dashboard/Sidebar";
import { authOptions } from "../lib/authOption";
import db from "@repo/db/client";
import InteractiveButton from "../../components/ui/InteractiveButton";
import Image from "next/image";
import profileImage from "../../../../assets/profile.png";
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
        kyc: true,
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
            <InteractiveButton variant="secondary" href="/home">
              <h1 className="text-xl p-2"> Back</h1>
            </InteractiveButton>

            <InteractiveButton variant="secondary" href="/your-account">
              <div className="flex gap-1.5 items-center">
                <div className="border border-red-400 rounded-full">
                  <Image
                    src={
                      user?.kyc?.profileImageUrl
                        ? user.kyc.profileImageUrl
                        : profileImage
                    }
                    height={40}
                    width={40}
                    alt="profile"
                  />
                </div>
                <h1 className="text-2xl ">{user?.username ?? "User"}</h1>
              </div>
            </InteractiveButton>
          </div>
          {children}
        </main>
      </div>
    </SessionGuard>
  );
}
