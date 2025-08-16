"use client";
import { useAuthError } from "@repo/store";
import { DynamicForm } from "@repo/ui";
import { signinSchema, signupSchema } from "@repo/zod-schema";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import type { ZodObject, ZodTypeAny } from "zod";

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

  // Pick the right schema based on mode
  const schema = mode === "signup" ? signupSchema : signinSchema;

  const handleSubmit = async (data: Record<string, string | boolean>): Promise<boolean> => {
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0] as string | undefined;
        if (path) fieldErrors[path] = issue.message;
      });
      setError(fieldErrors);
      return false;
    }

    // Clear all errors if the whole payload is valid
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
        }
        router.push("/dashboard");
      }
      return true;
    } catch {
      setError({ general: "Something went wrong" });
      return false;
    }
  };

  // Validate a single field on change; only clear its error when valid
  const handleFieldChange = (fieldName: string, value: string | boolean) => {
    // Only bother if that field currently has an error (keeps UX calm)
    if (!error?.[fieldName]) return;

    // Validate just this field against the schema's shape
    const obj = schema as unknown as ZodObject<Record<string, ZodTypeAny>>;
    const shape = (obj as any).shape as Record<string, ZodTypeAny> | undefined;
    const fieldSchema = shape?.[fieldName];
    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(value);
    if (result.success) {
      // Clear only this field's error now that it’s valid
      setError({ ...error, [fieldName]: null });
    } else {
      // Keep (or update) the error message to reflect current input
      const msg = result.error.issues[0]?.message ?? "Invalid value";
      setError({ ...error, [fieldName]: msg });
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
        onFieldChange={handleFieldChange}
      />
    </div>
  );
}
