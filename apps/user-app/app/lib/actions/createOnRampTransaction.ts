"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOption";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(
  amount: number,
  provider: string,
) {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  const token = Math.random().toString();

  if (!userId) {
    return {
      message: "User not logedIn",
    };
  }

  await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount: amount,
      status: "Processing",
      startTime: new Date(),
      provider: provider,
      token: token,
    },
  });

  return {
    message: "OnRampTransaction Is Done ",
  };
}
