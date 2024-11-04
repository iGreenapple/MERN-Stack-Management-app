import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CloseButton: React.FC<CloseButtonProps> = ({ ...rest }) => {
  return (
    <button className="absolute w-10 h-10 top-2 right-2" {...rest}>
      <FontAwesomeIcon icon="xmark" size="2xl" />
    </button>
  );
};

export default CloseButton;
