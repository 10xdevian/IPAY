// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // your custom id
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    id: string; // your custom id
    name?: string | null;
    email?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // add id to JWT
  }
}
