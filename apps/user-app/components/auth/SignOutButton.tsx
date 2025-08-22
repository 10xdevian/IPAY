"use client";

import { Button } from "@repo/ui";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      redirect: false, // disable automatic redirect
    });
    router.push("/signin"); // manually redirect
  };

  return (
    <Button variant="danger" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
