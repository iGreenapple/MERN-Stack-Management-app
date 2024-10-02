import Input from "../1_atoms/Input";
import Label from "../1_atoms/Label";
import ErrorMessage from "../1_atoms/ErrorMessage";

interface FormFieldProps {
  label: string;
  type: "text" | "email" | "password" | "number";
  name: string;
  // value?: string;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  minlength?: number;
  pattern?: string;
  errorMessage?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  // value,
  // onChange,
  placeholder = "",
  required = false,
  minlength,
  errorMessage = "This field is required",
}) => {
  

  return (
    <div>
      <Label
        className="peer-focus:text-blue-500 peer-focus:top-0 peer-focus:left-0 peer-focus:text-sm"
        htmlFor={name}
        label={label}
      />
      <Input className="peer" name={name} type={type} placeholder={placeholder} required={required} minLength={minlength}/>
      <ErrorMessage className="peer-invalid:visible" message={errorMessage} />
    </div>
  );
};

export default FormField;
