import { ErrorMessage, FormInput, Label, FormTextArea } from "../1_atoms";

interface FormFieldProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  label: string;
  type: "text" | "email" | "password" | "number" | "textarea";
  context: () => { state: any; dispatch: React.Dispatch<any> };
  name: string
  formName?: string
  placeholder: string;
  required?: boolean;
  minlength?: number;
  pattern?: string;
  errorMessage?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  form,
  label,
  type,
  context,
  formName,
  name,
  placeholder = "",
  required = false,
  minlength,
  errorMessage = "This field is required",
  ...rest
}) => {
  return (
    <fieldset form={form} {...rest} name={name}>
      <Label
        className="peer-focus:text-blue-500 peer-focus:top-0 peer-focus:left-0 peer-focus:text-sm"
        htmlFor={name}
        label={label}
      />
      {type === "textarea" ? (
        <FormTextArea className="peer" name={name} form={form} context={context} placeholder={placeholder} required={required} />
      ) : (
        <FormInput
          id={id}
          className="peer"
          type={type}
          name={name}
          form={form}
          formName={formName}
          context={context}
          placeholder={placeholder}
          required={required}
          minLength={minlength}
        />
      )}
      <ErrorMessage className="peer-invalid:visible" message={errorMessage} />
    </fieldset>
  );
};

export default FormField;
