import { Metadata } from "next";
import InteractiveButton from "../../../components/ui/InteractiveButton";
import ClientFormWrapper from "../../../components/auth/ClientFormWrapper";
import { Card } from "@repo/ui";

export const metadata: Metadata = {
  title: "Sign Up - MyApp",
  description: "Login to access your account",
};

export default function SignUpPage() {
  const fields = [
    {
      name: "Username",
      type: "text",
      label: "Username",
      required: true,
      placeholder: "vibhu12",
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      placeholder: "vik6025@gmail.com",
    },
    {
      name: "phone",
      type: "phone",
      label: "Phone",
      required: true,
      placeholder: "953142****",
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
    <Card className="w-[25rem] p-5">
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

        <ClientFormWrapper submitText="Signup" fields={fields} />

        <InteractiveButton
          variant="link"
          asButton={false}
          href="/signin"
          className="text-gray-900 pt-2 font-light"
        >
          Signin
        </InteractiveButton>
      </div>
    </Card>
  );
}
