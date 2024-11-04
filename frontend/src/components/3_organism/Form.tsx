import React, { ReactNode } from 'react'

// Organism component obsahující form složený z komponent FormField

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  errorMessage: string;
}

const Form: React.FC<FormProps> = ({ children, errorMessage, ...rest }) => {
  return (
    <form {...rest}>
      {errorMessage && <p className='text-red-500 text-sm'>{errorMessage}</p>}
      {children}
    </form>
  )
}

export default Form