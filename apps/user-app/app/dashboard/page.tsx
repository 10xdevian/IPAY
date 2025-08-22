import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOption";
import db from "@repo/db/client";
import SessionGuard from "../../components/auth/SessionGuard";
import { SignOutButton } from "../../components/auth/SignOutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  let user = null;
  if (session?.user?.id) {
    user = await db.user.findUnique({
      where: { id: session.user.id },
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
          Welcome {user?.name ?? "User"} 🚀
        </h1>

        <p>Email: {user?.email}</p>
        <p>Username: {user?.username}</p>
        <p>ID: {user?.id}</p>
        <p>Username: {user?.username}</p>

        <h2 className="mt-6 text-xl font-semibold">Balance</h2>
        {user?.Balance.map((b) => (
          <p key={b.id}>
            Amount: {b.amount}, Locked: {b.locked}
          </p>
        ))}

        <h2 className="mt-6 text-xl font-semibold">Transactions</h2>
        {user?.OnRampTransaction.map((txn) => (
          <p key={txn.id}>
            {txn.status} | {txn.amount} | {txn.provider}
          </p>
        ))}

        <SignOutButton />
      </div>
    </SessionGuard>
  );
}
