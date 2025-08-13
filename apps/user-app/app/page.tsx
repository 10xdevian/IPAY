"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui";
import { SignupInput, signupSchema } from "@repo/zod-schema";

export default function Page(): JSX.Element {
  const session = useSession();

  const testData: SignupInput = {
    name: "Vikram",
    email: "vikram@gmail.com",
    password: "123456",
  };

  // Validate using Zod
  const parsed = signupSchema.safeParse(testData);

  return (
    <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
      <h1>Zod Schema Test</h1>
      {parsed.success ? (
        <pre>✅ Valid Data: {JSON.stringify(parsed.data, null, 2)}</pre>
      ) : (
        <pre>❌ Errors: {JSON.stringify(parsed.error.format(), null, 2)}</pre>
      )}
    </div>
  );
}
