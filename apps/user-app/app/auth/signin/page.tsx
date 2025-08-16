import { Metadata } from "next";
import InteractiveButton from "../../../components/ui/InteractiveButton";
import ClientFormWrapper from "../../../components/auth/ClientFormWrapper";
import { Card } from "@repo/ui";

export const metadata: Metadata = {
  title: "Sign In - Ipay",
  description: "Login to access your account",
};

export default function SignInPage() {
  const fields = [
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      placeholder: "vik6025@gmail.com",
    },

    {
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      placeholder: "*******",
    },
  ];



  return (
    <Card className="w-[20rem] p-5">
      <div className="flex flex-col justify-center items-center ">
        <div className="flex flex-col justify-center items-center w-[15rem] h-[8rem] text-center gap-1">
          <InteractiveButton
            asButton={false}
            href="/"
            className="bg-orange-500 rounded-xl"
          >
            🕷️
          </InteractiveButton>

          <p className="text-black">Transfer money to P2P</p>
          <p className="text-gray-600 text-sm font-light">
            Real-time insights and detailed reports
          </p>
        </div>

        <ClientFormWrapper submitText="SignIn" fields={fields} mode="signin"/>

        <InteractiveButton
          variant="link"
          asButton={false}
          href="/auth/signup"
          className="text-gray-900 pt-2 font-light"
        >
          Dont Have account
        </InteractiveButton>
      </div>
    </Card>
  );
}
