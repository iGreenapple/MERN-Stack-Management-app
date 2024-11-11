import { useFormInput } from "../../hooks/useFormInput";

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  context: () => { state: any; dispatch: React.Dispatch<any> };
  name: string;
  formName?: string;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({
  className,
  cols,
  rows,
  name,
  form,
  formName,
  context,
  placeholder,
  ...rest
}) => {
  const { value, onChange } = useFormInput({ context, formName, field: name });

  return (
    <textarea
      className={`
        ${className}
        resize-none
        px-3 py-2 w-full h-[10rem] bg-light border border-gray-500/50 rounded-xl text-sm text-black
        focus:border-gray-600
        focus:shadow-lg focus:shadow-gray-600
        transition
        duration-300
        ease-in-out
        `}
      form={form}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};
