import React from "react";
import { FiX } from "react-icons/fi";

interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CloseButton: React.FC<CloseButtonProps> = ({ ...rest }) => {
  return (
    <button className="absolute w-10 h-10 top-2 right-2" {...rest}>
      <FiX size={32} />
    </button>
  );
};

export default CloseButton;
