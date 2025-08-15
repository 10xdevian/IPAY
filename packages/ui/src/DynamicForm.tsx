"use client";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button } from "./button";

interface Field {
  name: string;
  type: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

interface DynamicFormProps {
  fields: Field[];
  onSubmit: (data: Record<string, string | boolean>) => void;
  submitText?: string;
  className?: string;
  buttonVariant?: "primary" | "secondary" | string;
}

export const DynamicForm: FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  submitText = "Submit",
  className,
  buttonVariant,
}) => {
  // Initialize state
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

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);

    // Reset form state
    const resetData = fields.reduce(
      (acc, field) => {
        acc[field.name] = field.type === "checkbox" ? false : "";
        return acc;
      },
      {} as Record<string, string | boolean>
    );

    setFormData(resetData);
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          {field.type === "checkbox" ? (
            <label htmlFor="" className="flex items-center gap-2">
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                checked={formData[field.name] as boolean}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              {field.label && (
                <span className="text-gray-900 text-sm">{field.label}</span>
              )}
            </label>
          ) : (
            <>
              {field.label && (
                <label
                  htmlFor={field.name}
                  className="block mb-2 text-sm font-medium text-gray-900"
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
        </div>
      ))}

      <Button variant={buttonVariant} className="w-full h-full " type="submit">
        {submitText}
      </Button>
    </form>
  );
};
