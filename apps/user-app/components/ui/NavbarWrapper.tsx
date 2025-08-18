import { Navbar } from "@repo/ui";
import React from "react";
import InteractiveButton from "./InteractiveButton";

function NavbarWrapper() {
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
            <InteractiveButton variant="secondary" href="/signin">
              Login
            </InteractiveButton>
            <InteractiveButton href="/signup" variant="primary">
              Register
            </InteractiveButton>
          </>
        }
      />
    </div>
  );
}

export default NavbarWrapper;
