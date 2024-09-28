import { useState } from "react";
import Input from "../1_atoms/Input";
import Label from "../1_atoms/Label";

interface FormFieldProps {
  label: string;
  type: "text" | "email" | "password" | "number";
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  errorMessage?: string | null;
  isValid?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  errorMessage = "This field is required",
  isValid = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`${isFocused ? "" : ""}`}>
      <Label htmlFor={name} text={label} />
      <Input type={type} placeholder={placeholder} />
      {!isValid && (
        <p className="mt-0 ml-3 italic text-sm text-rose-600" id={`${name}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormField;
