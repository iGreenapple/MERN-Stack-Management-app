import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit";
  children?: ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, children, onClick, className, ...rest }) => {
  return (
    <button
      className={`${className} w-full py-2 px-4 bg-grey text-white text-bold rounded-md hover:bg-dark`}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
