// ClientFormWrapper.tsx
"use client";
import { DynamicForm } from "@repo/ui";

interface Field {
  name: string;
  type: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

interface ClientFormWrapperProps {
  fields: Field[];
  submitText: string;
}

export default function ClientFormWrapper({
  fields,
  submitText,
}: ClientFormWrapperProps) {
  const handleSubmit = (data: Record<string, string | boolean>) => {
    console.log("Form Data:", data);
    // You can also call server actions here if needed
  };

  return (
    <DynamicForm
      fields={fields}
      onSubmit={handleSubmit}
      submitText={submitText}
      buttonVariant="primary"
    />
  );
}
