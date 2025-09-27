"use server";
import prisma from "@repo/db/client";
import { authOptions } from "../authOption";
import { getServerSession } from "next-auth";

export async function P2PTransfer(amount: number, to: string) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;

  if (!from) {
    return {
      message: "User not found",
    };
  }

  const toUser = await prisma.user.findFirst({
    where: {
      phone: to,
    },
  });

  if (!toUser) {
    return {
      message: "Receiver User Not Found",
    };
  }

  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userIDd" = ${Number(from)} FOR UPDATE`;

    const fromBalance = await tx.balance.findUnique({
      where: { userId: Number(from) },
    });

    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("Insufficient balance");
    }

    await tx.balance.update({
      where: { userId: Number(from) },
      data: {
        amount: { decrement: amount },
      },
    });

    await tx.balance.update({
      where: { userId: toUser.id },
      data: {
        amount: { increment: amount },
      },
    });

    await tx.p2pTransfer.create({
      data: {
        sendrId: Number(from),
        receiverId: toUser.id,
        amount,
        timestamp: new Date(),
      },
    });
  });
}
