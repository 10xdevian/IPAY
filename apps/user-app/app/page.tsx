"use client";
import { Card } from "@repo/ui";
import InteractiveButton from "../components/ui/InteractiveButton";
import PageTransition from "../components/transitions/PageTransition";

export default function Page(): JSX.Element {
  return (
    <PageTransition>
      <div className="bg-[#e9edee] w-screen h-screen flex justify-center items-center  text-center flex-col gap-10">
        <div className="flex flex-col justify-center items-center gap-3 w-[30rem] ">
          <h1 className="text-3xl font-bold text-black">Ipay </h1>
          <p className="text-gray-700 font-light">
            Manage your finances with powerful analytics, real-time insights,
            and intuitive controls.
          </p>
        </div>

        <div className="flex flex-row gap-2">
          <Card className="flex flex-col justify-center items-center w-[15rem] h-[8rem] text-center gap-1">
            {/* icon */}
            <h1 className="text-orange-500">Icon</h1>
            <p className="text-black">Transfer money to P2P</p>
            <p className="text-gray-600 text-sm font-light">
              Real-time insights and detailed reports
            </p>
          </Card>

          <Card className="flex flex-col justify-center items-center w-[15rem] h-[8rem] text-center gap-1">
            {/* icon */}
            <h1 className="text-orange-500">Icon</h1>
            <p className="text-black">Transfer money to P2P</p>
            <p className="text-gray-600 text-sm font-light">
              Real-time insights and detailed reports
            </p>
          </Card>
          <Card className="flex flex-col justify-center items-center w-[15rem] h-[8rem] text-center gap-1">
            {/* icon */}
            <h1 className="text-orange-500">Icon</h1>
            <p className="text-black">Transfer money to P2P</p>
            <p className="text-gray-600 text-sm font-light">
              Real-time insights and detailed reports
            </p>
          </Card>
        </div>
        <InteractiveButton
          asButton={false}
          href="/signin"
          variant="primary"
          className="bg-orange-600 hover:bg-orange-500 w-[15rem] h-[2rem]"
        >
          Sign In 
        </InteractiveButton>
      </div>
    </PageTransition>
  );
}
