import { getServerSession } from "next-auth";
import React from "react";
import db from "@repo/db/client";
import { authOptions } from "../../lib/authOption";
import TransactionsList from "../../../components/dashboard/TransactionList";

async function page() {
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
    <div>
      <h1>Transaction</h1>
      <TransactionsList transaction={user?.OnRampTransaction || []} />
    </div>
  );
}

export default page;
