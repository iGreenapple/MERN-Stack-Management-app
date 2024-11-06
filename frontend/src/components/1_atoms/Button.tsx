import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={`${className} w-full py-2 px-4 bg-mediumgrey text-white text-bold rounded-md hover:bg-dark`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
