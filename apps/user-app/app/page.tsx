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
      
     </div>

    </>
  );
}
