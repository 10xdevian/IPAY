import { Metadata } from "next";
import InteractiveButton from "../../../components/ui/InteractiveButton";
import ClientFormWrapper from "../../../components/auth/ClientFormWrapper";
import { Button, Card } from "@repo/ui";
export const metadata: Metadata = {
  title: "Sign Up - MyApp",
  description: "Login to access your account",
};

export default function SignUpPage() {
  const fields = [
    { name: "name", type: "text", label: "Name", required: true },
    { name: "username", type: "text", label: "Username", required: true },
    { name: "email", type: "email", label: "Email", required: true },
    { name: "number", type: "tel", label: "Phone Number", required: true },
    { name: "password", type: "password", label: "Password", required: true },

    {
      name: "acceptTerms",
      type: "checkbox",
      label: "Accept Terms",
      required: true,
    },
  ];

  return (
    <Card className="p-[2rem]">
      <div className="flex flex-col justify-center items-center ">
        <div className="flex flex-col justify-center items-center  w-[25rem] h-[8rem] text-center gap-0.5 ">
          <div className="flex justify-center gap-1 items-center  ">
            <p className="text-black text-xl font-semibold capitalize">
              Create your
            </p>
            <InteractiveButton
              variant="primary"
              className="w-[5rem] font-bold "
              href="/"
            >
              IPAY
            </InteractiveButton>
            <p className="text-black text-xl font-semibold capitalize">
              account
            </p>
          </div>

          <div className="flex justify-center items-center">
            <p className="text-gray-600 text-sm font-light">
              Already have an account?
            </p>
            <InteractiveButton
              variant="link"
              asButton={false}
              href="/signin"
              className="text-gray-900  font-light"
            >
              Login
            </InteractiveButton>
          </div>
        </div>

        <ClientFormWrapper mode="signup" submitText="Signup" fields={fields} />
      </div>
    </Card>
  );
}
