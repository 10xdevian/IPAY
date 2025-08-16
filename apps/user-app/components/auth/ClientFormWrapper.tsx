// ClientFormWrapper.tsx
"use client";
import { useAuthError } from "@repo/store";
import { DynamicForm } from "@repo/ui";
import { signupSchema } from "@repo/zod-schema";
import { useRouter } from "next/navigation";
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

  const handleSubmit = async (data: Record<string, string | boolean>) => {
    const parsed = signupSchema.safeParse(data);
    if (!parsed.success) {
      // parsed.error is ZodError
      const messages = parsed.error.issues
        .map((issue) => issue.message)
        .join(", ");
      setError(messages);
      return;
    }
    setError(null);

    // Call API route for signup

    try {
      const res = await axios.post(`/api/auth/${mode}`, parsed.data);
      console.log("API response:", res.data);
      router.push(mode === "signup" ? "signin" : "/dashboard");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="w-full">
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <DynamicForm
        fields={fields}
        onSubmit={handleSubmit}
        submitText={submitText}
        buttonVariant="primary"
      />
    </div>
  );
}
