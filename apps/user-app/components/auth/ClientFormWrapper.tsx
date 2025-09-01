"use client";
import {
  useAuthError,
  useLoading,
  useOtpLogin,
  useOtpModal,
} from "@repo/store";
import { DynamicForm } from "@repo/ui";
import { signinSchema, signupSchema } from "@repo/zod-schema";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import type { ZodObject, ZodTypeAny } from "zod";
import { toast } from "react-hot-toast";
import { useState } from "react";
import OtpModal from "./OtpModal";
import { Field } from "@repo/types";

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

  //  Recoil state
  const { error, setError } = useAuthError();
  const { loading, startLoading, stopLoading } = useLoading();
  const { setIsOtpLogin, isOtpLogin } = useOtpLogin();
  const { openModal } = useOtpModal();
  const [otpValue, setOtpValue] = useState("");
  const [formValues, setFormValues] = useState<
    Record<string, string | boolean>
  >({});

  // Pick the right schema based on mode
  const schema = mode === "signup" ? signupSchema : signinSchema;

  const handleSubmit = async (
    data: Record<string, string | boolean>
  ): Promise<boolean> => {
    // OTP

    if (isOtpLogin && mode === "signin") {
      try {
        startLoading();
        // const res = await axios.post("/api/auth/send-otp", {
        //   phone: data.phone,
        // });
        // toast.success(res.data.message || "Otp sent successfully");
        openModal();
        return true;
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to send Otp");
        return false;
      } finally {
        startLoading();
      }
    }
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
    startLoading();

    try {
      startLoading();
      if (mode === "signup") {
        const res = await axios.post("/api/auth/signup", parsed.data);
        // 🔥 show toast
        // toast.success("User created successfully!");
        toast.success(res.data.message || "Signup successful");
        router.push("/signin");
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
        toast.success(res?.error || "signin successful");
        router.push("/home");
      }
      return true;
    } catch (err: any) {
      if (err.response?.data?.fieldErrors) {
        // 👇 map backend errors to the right input fields
        const fieldErrors: Record<string, string> = {};
        err.response.data.fieldErrors.forEach(
          (fe: { field: string; message: string }) => {
            fieldErrors[fe.field] = fe.message;
          }
        );
        setError(fieldErrors);
      } else {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
      return false;
    } finally {
      stopLoading(); // ✅ stop loading
    }
  };

  // Validate a single field on change; only clear its error when valid
  const handleFieldChange = (fieldName: string, value: string | boolean) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));

    if (fieldName === "loginWithOtp") {
      setIsOtpLogin(value as boolean);
    }

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
        fields={
          mode === "signin"
            ? isOtpLogin
              ? fields.filter(
                  (f) => f.name !== "password" && f.name !== "email"
                )
              : fields.filter((f) => f.name !== "phone")
            : fields
        }
        onSubmit={handleSubmit}
        submitText={isOtpLogin ? "Send OTP" : submitText}
        buttonVariant="primary"
        fieldErrors={error}
        onFieldChange={handleFieldChange}
        isLoading={loading}
      />

      <OtpModal
        otpValue={otpValue}
        setOtpValue={setOtpValue}
        onVerify={async () => {
          try {
            startLoading();
            const res = await axios.post("/api/auth/verify-otp", {
              phone: formValues.phone, // ✅ use formValues instead of fields
              otp: otpValue,
            });
            toast.success(res.data.message || "OTP verified!");
            router.push("/dashboard");
          } catch (err: any) {
            toast.error(err.response?.data?.message || "Invalid OTP");
          } finally {
            stopLoading();
          }
        }}
      />
    </div>
  );
}
