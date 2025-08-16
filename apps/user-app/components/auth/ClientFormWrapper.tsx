"use client";
import { useAuthError } from "@repo/store";
import { DynamicForm } from "@repo/ui";
import { signinSchema, signupSchema } from "@repo/zod-schema";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";

interface Field {
  name: string;
  type: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

interface ClientFormWrapperProps {
  fields: Field[];
  mode?: "signup" | "signin";
  submitText: string;
}

export default function ClientFormWrapper({
  fields,
  submitText,
  mode = "signup",
}: ClientFormWrapperProps) {
  const router = useRouter();
  const { error, setError } = useAuthError();

  const handleSubmit = async (data: Record<string, string | boolean>): Promise<boolean> => {
    const schema = mode === "signup" ? signupSchema : signinSchema;
    const parsed = schema.safeParse(data);

    // Create a new error object per submission
    const fieldErrors: Record<string, string> = {};

     if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        if (issue.path[0]) fieldErrors[issue.path[0] as string] = issue.message;
      });
      setError(fieldErrors);
      return false;
    }

    setError({});

    try {
      if (mode === "signup") {
        await axios.post("/api/auth/signup", parsed.data);
        router.push("/auth/signin");
      } else {
        const res = await signIn("credentials", {
          redirect: false,
          email: parsed.data.email,
          password: parsed.data.password,
        });

        if (res?.error) {
          setError({ general: res.error });
          return false;
        } else {
          router.push("/dashboard");
        }
      }
      return true;
    } catch (err: any) {
      setError({ general: "Something went wrong" });
      return false;
    }
  };

  return (
    <div className="w-full">
      {error?.general && (
        <p className="text-red-500 text-sm mb-2">{error.general}</p>
      )}
      <DynamicForm
        fields={fields}
        onSubmit={handleSubmit}
        submitText={submitText}
        buttonVariant="primary"
        fieldErrors={error}
      />
    </div>
  );
}
