import { ErrorMessage, Input, Label, TextArea } from "../1_atoms";

interface FormFieldProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  label: string;
  type: "text" | "email" | "password" | "number" | "textarea";
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
  form,
  // value,
  // onChange,
  placeholder = "",
  required = false,
  minlength,
  errorMessage = "This field is required",
}) => {
  

  return (
    <fieldset>
      <Label
        className="peer-focus:text-blue-500 peer-focus:top-0 peer-focus:left-0 peer-focus:text-sm"
        htmlFor={name}
        label={label}
      />
      {type === "textarea" ? (
        <TextArea className="peer" name={name} form={form} placeholder={placeholder} required={required}/>
      ) : (
        <Input className="peer" type={type} name={name} form={form}  placeholder={placeholder} required={required} minLength={minlength}/>
      )}
      <ErrorMessage className="peer-invalid:visible" message={errorMessage} />
    </fieldset>
  );
};

export default FormField;
