import { getServerSession } from "next-auth";
import db from "@repo/db/client";
import { authOptions } from "../../lib/authOption";
import { SignOutButton } from "../../../components/auth/SignOutButton";
import SessionGuard from "../../../components/auth/SessionGuard";

export default async function YourAccount() {
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
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          Welcome {user?.username ?? "User"} 🚀
        </h1>

        <p>Email: {user?.email}</p>
        <p>Username: {user?.username}</p>

        <SignOutButton />
      </div>
    </SessionGuard>
  );
}
