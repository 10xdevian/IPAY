"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SessionGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      const timer = setTimeout(() => {
        router.push("/signin"); // redirect after 2s
      }, 2000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">⏳ Redirecting...</h1>
        <p className="text-gray-600">You are not logged in. Redirecting to Sign In page in 2 seconds.</p>
      </div>
    );
  }

  return <>{children}</>;
}
