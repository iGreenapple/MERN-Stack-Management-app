import React, { useCallback } from "react";

interface UseInputProps {
  context: () => { state: any; dispatch: React.Dispatch<any> };
  formName?: string;
  field: string;
}

export const useFormInput = ({ context, formName, field }: UseInputProps) => {
  // destrukce contextu, který skrze props do FormInputu pošleme
  const { state, dispatch } = context();
  
  // if statement pro případ kdy je definovaný formName → v prvním případě je state vícevrstvý formname → field, v druhém obsahuje jenom field (viz contexty)
  const value = formName ? state[formName][field] : state[field];
  

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {

      dispatch({
        type: "SET_FIELD",
        formName: formName,
        field: field,
        value: e.target.value,
      });
    },
    [dispatch, field, formName]
  );

  return {
    value,
    onChange: handleChange,
  };
};
