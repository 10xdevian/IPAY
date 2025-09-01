"use client";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button } from "./button";
import { Field } from "@repo/types";

type ButtonVariant = "primary" | "secondary" | "outline" | "link" | "logo";

interface DynamicFormProps {
  fields: Field[];
  onSubmit: (data: Record<string, string | boolean>) => Promise<boolean>;
  submitText?: string;
  className?: string;
  buttonVariant?: ButtonVariant;
  fieldErrors?: Record<string, string | null>;
  onFieldChange?: (fieldName: string, value: string | boolean) => void; // NEW
  isLoading?: boolean;
}

export const DynamicForm: FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  submitText = "Submit",
  className,
  buttonVariant,
  fieldErrors = {},
  onFieldChange,
  isLoading,
}) => {
  const [formData, setFormData] = useState<Record<string, string | boolean>>(
    () =>
      fields.reduce(
        (acc, field) => {
          acc[field.name] = field.type === "checkbox" ? false : "";
          return acc;
        },
        {} as Record<string, string | boolean>
      )
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;

    const { name, type, value } = target;

    let next: string | boolean;

    if (target instanceof HTMLInputElement && type === "checkbox") {
      next = target.checked;
    } else {
      next = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: next,
    }));

    // Ask parent to validate this one field; only clears if valid
    if (onFieldChange) onFieldChange(name, next);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(formData);

    if (success) {
      const resetData = fields.reduce(
        (acc, field) => {
          acc[field.name] = field.type === "checkbox" ? false : "";
          return acc;
        },
        {} as Record<string, string | boolean>
      );
      setFormData(resetData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className ?? ""}`}>
      {fields.map((field) => (
        <div key={field.name} className="mb-2">
          {field.type === "checkbox" ? (
            <label className="flex items-center gap-1">
              <input
                id={field.name}
                name={field.name}
                type="checkbox"
                checked={formData[field.name] as boolean}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   "
              />
              {field.label && (
                <span className="text-gray-900 text-sm">{field.label}</span>
              )}
            </label>
          ) : field.type === "select" ? (
            <>
              {field.label && (
                <label
                  htmlFor={field.name}
                  className="block mb-0.5 text-sm font-medium text-gray-900"
                >
                  {field.label}
                </label>
              )}

              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] as string}
                onChange={handleChange}
                className="border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                required={field.required}
              >
                <option value="" disabled>
                  Select your bank
                </option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              {field.label && (
                <label
                  htmlFor={field.name}
                  className="block mb-0.5 text-sm font-medium text-gray-900"
                >
                  {field.label}
                </label>
              )}
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.name] as string}
                onChange={handleChange}
                className="border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 placeholder-gray-400"
              />
            </>
          )}

          {fieldErrors[field.name] && (
            <p className="text-red-500 text-xs mt-1">
              {fieldErrors[field.name]}
            </p>
          )}
        </div>
      ))}

      <Button
        isLoading={isLoading}
        variant={buttonVariant}
        className="w-full h-full mt-4"
        type="submit"
      >
        {submitText}
      </Button>
    </form>
  );
};
