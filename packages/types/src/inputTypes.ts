export type FieldType =
  | "checkbox"
  | "email"
  | "password"
  | "select"
  | "text"
  | "tel";

export interface Option {
  label: string;
  value: string;
}

export interface BaseField {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export interface TextField extends BaseField {
  type: "text" | "email" | "password" | "tel";
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
}

export interface SelectField extends BaseField {
  type: "select";
  options: Option[];
}

export type Field = TextField | CheckboxField | SelectField;
