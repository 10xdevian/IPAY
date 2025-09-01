import { Navbar } from "@repo/ui";
import React from "react";
import InteractiveButton from "./InteractiveButton";
import { SignOutButton } from "../auth/SignOutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/lib/authOption";

async function NavbarWrapper() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Navbar
        leftItems={
          <>
            <InteractiveButton
              href="/"
              variant="logo"
              asButton={false}
              className="text-black"
            >
              <div className="flex gap-2">
                🐍
                <h1 className="text-4xl">Ipay</h1>
              </div>
            </InteractiveButton>
            <InteractiveButton href="/" variant="primary">
              Personal
            </InteractiveButton>
            <InteractiveButton href="/business " variant="secondary">
              Business
            </InteractiveButton>
          </>
        }
        rightItems={
          <>
            <InteractiveButton variant="secondary" href="/pricing">
              Pricing
            </InteractiveButton>
            <InteractiveButton variant="secondary" href="/help">
              Help
            </InteractiveButton>

            {session ? (
              <SignOutButton />
            ) : (
              <>
                <InteractiveButton variant="secondary" href="/signin">
                  Login
                </InteractiveButton>
                <InteractiveButton href="/signup" variant="primary">
                  Register
                </InteractiveButton>
              </>
            )}
          </>
        }
      />
    </div>
  );
}

export default NavbarWrapper;
