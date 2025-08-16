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
    { name: "username", type: "text", label: "Username", required: true },
    { name: "email", type: "email", label: "Email", required: true },
    { name: "password", type: "password", label: "Password", required: true },
    { name: "number", type: "text", label: "Phone Number", required: true },
    {
      name: "acceptTerms",
      type: "checkbox",
      label: "Accept Terms",
      required: true,
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

        <ClientFormWrapper mode="signup" submitText="Signup" fields={fields} />

        <InteractiveButton
          variant="link"
          asButton={false}
          href="/auth/signin"
          className="text-gray-900 pt-2 font-light"
        >
          Signin
        </InteractiveButton>
      </div>
    </Card>
  );
}
