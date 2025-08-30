import { getServerSession } from "next-auth";
import { authOptions } from "./authOption";
import db from "@repo/db/client";

export async function getUserWithDetails() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const user = await db.user.findUnique({
    where: { id: Number(session.user.id) },
    select: {
      id: true,
      username: true,
      phone: true,
      email: true,
      kyc: {
        select: {
          fullName: true,
          fatherName: true,
          city: true,
          pincode: true,
          profileImageUrl: true,
          documentType: true,
          status: true,
          updatedAt: true,
        },
      },
      OnRampTransaction: {
        orderBy: { startTime: "desc" },
        select: {
          id: true,
          status: true,
          provider: true,
          amount: true,
          startTime: true,
        },
      },
      Balance: {
        select: {
          amount: true,
          locked: true,
        },
      },
    },
  });

  // initialize balances
  let totalBalance = 0;
  let lockedBalance = 0;
  let usableBalance = 0;

  if (user) {
    totalBalance = user.Balance.reduce((acc, b) => acc + b.amount, 0);
    lockedBalance = user.Balance.reduce((acc, b) => acc + b.locked, 0);
    usableBalance = totalBalance - lockedBalance;

    const fullname = user.kyc?.fullName || user.username;
    user.OnRampTransaction = user.OnRampTransaction.map((txn) => ({
      ...txn,
      walletTitle: `${fullname} add to wallet`,
    }));
  }

  return {
    ...user,
    walletBalance: {
      totalBalance,
      lockedBalance,
      usableBalance,
    },
  };
}
