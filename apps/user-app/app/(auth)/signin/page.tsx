import { Metadata } from "next";
import InteractiveButton from "../../../components/ui/InteractiveButton";
import ClientFormWrapper from "../../../components/auth/ClientFormWrapper";
import { Card } from "@repo/ui";

export const metadata: Metadata = {
  title: "Sign In - IPAY",
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
    <Card className="w-auto p-10">
      <div className="flex flex-col justify-center items-center ">
        <div className="flex flex-col justify-center items-center w-[30rem] text-center gap-2 mb-3">
          <h1 className="text-xl font-bold">Welcome Back.</h1>

          <div className="flex justify-center items-center gap-0.5">
            <p className="text-gray-600 text-sm font-light">New to</p>
            <InteractiveButton
              variant="primary"
              className="w-[4rem] font-bold "
              href="/"
            >
              IPAY?
            </InteractiveButton>
            <InteractiveButton
              variant="link"
              asButton={false}
              href="/signup"
              className="text-gray-900  font-light"
            >
              Sign up
            </InteractiveButton>
          </div>
        </div>

        <ClientFormWrapper submitText="SignIn" fields={fields} mode="signin" />
      </div>
    </Card>
  );
}
