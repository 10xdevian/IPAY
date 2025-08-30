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
    },
  });

  // add walletTitle for UI Lets assume onRampTransaction is used for adding money to wallet

  if (user) {
    const fullname = user.kyc?.fullName || user.username;
    user.OnRampTransaction = user.OnRampTransaction.map((txn) => ({
      ...txn,
      walletTitle: `${fullname} add to wallet`,
    }));
  }
}
