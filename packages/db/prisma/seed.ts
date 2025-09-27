import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // First user (alice)
  const alice = await prisma.user.upsert({
    where: { phone: "9531421477" },
    update: {},
    create: {
      phone: "9531421477",
      email: "vibhu7@gmail.com",
      username: "vibhu7",
      password: await hash("vibhu7", 10),
      Balance: {
        create: {
          amount: 6000000,
          locked: 10000,
        },
      },
      OnRampTransaction: {
        create: [
          {
            startTime: new Date(),
            status: "Success",
            amount: 100000,
            token: "token__11",
            provider: "HDFC BANK",
          },
          {
            startTime: new Date(),
            status: "Success",
            amount: 12264.28,
            token: "token__12",
            provider: "ICICI BANK",
          },
          {
            startTime: new Date(),
            status: "Success",
            amount: 137249.13,
            token: "token__13",
            provider: "SBI",
          },
          {
            startTime: new Date(),
            status: "Success",
            amount: 714725.0,
            token: "token__14",
            provider: "AXIS BANK",
          },
          {
            startTime: new Date(),
            status: "Success",
            amount: 30000,
            token: "token__15",
            provider: "HDFC BANK",
          },
          {
            startTime: new Date(),
            status: "Success",
            amount: 2000,
            token: "token__16",
            provider: "HDFC BANK",
          },
          {
            startTime: new Date(),
            status: "Success",
            amount: 30000,
            token: "token__17",
            provider: "HDFC BANK",
          },
          {
            startTime: new Date(),
            status: "Success",
            amount: 30000,
            token: "token__18",
            provider: "HDFC BANK",
          },
          {
            startTime: new Date(),
            status: "Success",
            amount: 30000,
            token: "token__19",
            provider: "HDFC BANK",
          },
        ],
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
          documentNumber: await hash("2343123134134151", 10),
          paymentPin: await hash("6023", 10),
          status: "Approved",
        },
      },
    },
  });

  // Second user (bob)
  const bob = await prisma.user.upsert({
    where: { phone: "9876543210" },
    update: {},
    create: {
      phone: "9876543210",
      email: "bob@example.com",
      username: "bob123",
      password: await hash("bobpassword", 10),
      Balance: {
        create: {
          amount: 10000,
          locked: 0,
        },
      },
      OnRampTransaction: {
        create: [
          {
            startTime: new Date(),
            status: "Success",
            amount: 1000,
            token: "token__20",
            provider: "HDFC BANK",
          },
          {
            startTime: new Date(),
            status: "Success",
            amount: 3000,
            token: "token__21",
            provider: "ICICI BANK",
          },
        ],
      },
      kyc: {
        create: {
          fullName: "bob singh",
          fatherName: "rajesh singh",
          city: "Delhi",
          pincode: "110001",
          profileImageUrl:
            "https://ik.imagekit.io/pay/default-image.jpg?updatedAt=1756446446781",
          documentType: "Aadhaar",
          documentNumber: await hash("1111222233334444", 10),
          paymentPin: await hash("1234", 10),
          status: "Approved",
        },
      },
    },
  });

  console.log("✅ Seed complete! Seeded users:", { alice, bob });
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
