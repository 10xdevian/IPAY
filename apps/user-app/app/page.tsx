"use client";
import { Button, Card } from "@repo/ui";
import InteractiveButton from "../components/ui/InteractiveButton";
import PageTransition from "../components/transitions/PageTransition";
import NavbarWrapper from "../components/ui/NavbarWrapper";

export default function Page(): JSX.Element {
  return (
    <>
      <div className="w-screen h-screen pt-5 pb-5 pl-40 pr-40 ">
        <NavbarWrapper />
        <div className="flex justify-between items-center  mt-[5rem]">
          <div className="flex flex-col gap-4 max-w-[20rem] ">
            <h1 className="text-6xl font-bold">The Wallet </h1>
            <p className="">A simple and secure wallet for all your Payments</p>
            <InteractiveButton variant="primary" href="/signin">
              Get started
            </InteractiveButton>
          </div>

          <div className="bg-red-100 w-full max-w-[200px] ">Image</div>
        </div>
      </div>
    </>
  );
}
