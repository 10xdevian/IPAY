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
        JSON.stringify({
          errors: parsed.error.issues.map((i) => ({
            field: i.path[0],
            message: i.message,
          })),
        }),
        { status: 400 }
      );
    }

    let { email, password, username, name, number } = parsed.data;

    email = email.toLowerCase().trim();
    username = username.toLowerCase().trim();

    // ✅ Check email
    const emailExists = await prisma.user.findUnique({ where: { email } });
    if (emailExists) {
      return new Response(
        JSON.stringify({
          field: "email",
          message: "Email is already in use. Please login.",
        }),
        { status: 400 }
      );
    }

    // ✅ Check username
    const usernameExists = await prisma.user.findUnique({
      where: { username },
    });
    if (usernameExists) {
      return new Response(
        JSON.stringify({
          field: "username",
          message: "Username is already taken.",
        }),
        { status: 400 }
      );
    }

    // ✅ Check phone number
    const numberExists = await prisma.user.findUnique({ where: { number } });
    if (numberExists) {
      return new Response(
        JSON.stringify({
          field: "number",
          message: "Phone number is already registered. Please login.",
        }),
        { status: 400 }
      );
    }

   

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    await prisma.user.create({
      data: { email, name, username, password: hashedPassword, number },
    });

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup Error:", err);
    return new Response(
      JSON.stringify({ message: "Signup failed, please try again later" }),
      {
        status: 500,
      }
    );
  }
}
