import React from "react";
import { useFormInput } from "../../hooks/useFormInput";

// do props naší komponenty vkládáme všechny default input atributy
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  context: () => { state: any; dispatch: React.Dispatch<any> };
  name: string;
  formName?: string;
}

// rest představuje všechny explicitně nevyjádřené atributy
export const FormInput: React.FC<FormInputProps> = ({
  id,
  className,
  type,
  name,
  form,
  formName,
  placeholder,
  context,
  ...rest
}) => {
  // do hooku useFormInput vkládáme context, formName (id form, takže signup, login atd.) a field
  // formName je třeba uložit do separátní props, co není pro další účeli, protože pro single-form je nepovinná
  const { value, onChange } = useFormInput({ context, formName, field: name });

  return (
    <input
      id={id}
      // focus:outline-none → zruší default outline při focus inputu
      className={`
        ${className}
        px-3 py-2 w-full bg-light border border-gray-700 rounded-xl text-sm text-black
        focus:outline-none
        focus:border-dark
        focus:ring-2 
        focus:ring-gray-600/40
        focus:shadow-lg
        focus:shadow-gray-400
        valid:border-green-500 valid:ring-1 valid:ring-green-500
        invalid:border-rose-600 invalid:text-rose-600
        focus:invalid:border-rose-500 focus:invalid:ring-rose-400  
        transition 
        duration-300 
        ease-in-out`}
      type={type}
      name={name}
      form={form}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};
