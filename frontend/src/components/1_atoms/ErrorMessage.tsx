import React from "react";

interface ErrorMessageProps {
  className?: string;
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ className, message }) => {
  if (!message) return null;

  return <p className={`${className} invisible ml-2 italic text-sm text-rose-600`}>{message}</p>;
};

export default ErrorMessage;
