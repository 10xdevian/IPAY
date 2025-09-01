"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import InteractiveButton from "../ui/InteractiveButton";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      redirect: false, // disable automatic redirect
    });
    router.push("/signin"); // manually redirect
  };

  return (
    <InteractiveButton className="px-6 py-3" onClick={handleSignOut} variant="primary">
      Log Out
    </InteractiveButton>
  );
}
