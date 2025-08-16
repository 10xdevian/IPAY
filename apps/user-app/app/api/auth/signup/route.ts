import prisma from "@repo/db/client";
import { signupSchema } from "@repo/zod-schema";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Zod validation on API
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ message: parsed.error.issues.map(i => i.message).join(", ") }),
        { status: 400 }
      );
    }

    const { email, password, username, number } = parsed.data;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    await prisma.user.create({
      data: { email, name: username, password: hashedPassword, number },
    });

    return new Response(JSON.stringify({ message: "User created successfully" }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Signup failed" }), { status: 500 });
  }
}
