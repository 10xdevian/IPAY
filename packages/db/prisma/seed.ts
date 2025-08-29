import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");
  const alice = await prisma.user.upsert({
    // upsert mean create and update
    where: { phone: "9531421471" },
    update: {},
    create: {
      phone: "9531421471",
      username: "vibhu123",
      password: await hash("alice1", 10),
      Balance: {
        create: {
          amount: 10000,
          locked: 0,
        },
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 10000,
          token: "token__1",
          provider: "HDFC BANK",
        },
      },
      kyc: {
        create: {
          fullName: "vikram kumar",
          fatherName: "sanjay sah",
          city: "Muzaffarpur",
          pincode: "843111",
          profileImageUrl:
            "https://ik.imagekit.io/pay/default-image.jpg?updatedAt=1756446446781",
          documentType: "Aadhaar",
          documentNumber: "23431231341341",
          paymentPin: "6026",
          status: "Approved",
        },
      },
    },
  });
  console.log("✅ Seed complete! Seeded user:", { alice });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error("❌ Error during seed:", e);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
