import { getServerSession } from "next-auth";
import db from "@repo/db/client";
import { authOptions } from "../../lib/authOption";
import SessionGuard from "../../../components/auth/SessionGuard";

export default async function DashboardPage() {
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
        <h1>Home page</h1>

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
      </div>
    </SessionGuard>
  );
}
