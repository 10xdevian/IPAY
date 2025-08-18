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
              href="/ipay"
              variant="logo"
              asButton={false}
              className="text-black"
            >
              <div className="flex gap-2">
                🐍
                <h1 className="text-4xl">Ipay</h1>
              </div>
            </InteractiveButton>
            <InteractiveButton
              
              href="/personal"
              variant="primary"
            >
              Personal
            </InteractiveButton>
            <InteractiveButton href="/business " variant="secondary">
              Business
            </InteractiveButton>
          </>
        }
        rightItems={
          <>
            <InteractiveButton variant="outline" href="/pricing">
              Pricing
            </InteractiveButton>
            <InteractiveButton href="/help">Help</InteractiveButton>
            <InteractiveButton href="/login">Login</InteractiveButton>
            <InteractiveButton href="/register" variant="secondary">
              Register
            </InteractiveButton>
          </>
        }
      />
    </div>
  );
}

export default NavbarWrapper;
