"use client";

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
    <button
      onClick={handleSignOut}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    >
      Sign Out
    </button>
  );
}
