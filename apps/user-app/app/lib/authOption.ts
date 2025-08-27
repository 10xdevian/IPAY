import prisma from "@repo/db/client";
import { signinSchema } from "@repo/zod-schema";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any): Promise<any> {
        const parsed = signinSchema.safeParse(credentials);

        if (!parsed.success) {
          throw new Error("Invalid input");
        }

        //  otp login
        if (parsed.data.loginWithOtp) {
          const { phone } = parsed.data;
          const user = await prisma.user.findUnique({ where: { phone } });
          if (!user) {
            throw new Error("Phone not registered");
          }

          // Normally you'd check OTP here (e.g., compare codes from DB/Redis)
          // For now, assume OTP was validated externally

          return {
            id: user.id,
            email: user.email,
            username: user.username,
          };
        }

        // Password login
        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error("Invalid email");
        }

        //  check password
        if (!user?.password) {
          throw new Error("Invalid password");
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
          throw new Error("Enter correct password");
        }
        return {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as any;
      }
      return session;
    },
  },
};
