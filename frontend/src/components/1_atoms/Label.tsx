import React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string
}

const Label: React.FC<LabelProps> = ({ className, htmlFor, label, ...rest }) => {
  return (
    <label className={`block logo text-md pl-1 ${className}`}  htmlFor={htmlFor} {...rest}>
        {label}
    </label>
  )
}

export default Label