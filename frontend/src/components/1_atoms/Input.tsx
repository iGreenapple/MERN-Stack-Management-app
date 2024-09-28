import React, { useState } from "react";

// do props naší komponenty vkládáme všechny default input atributy
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// rest představuej všechny explicitně nevyjádřené atributy
const Input: React.FC<InputProps> = ({ type, name, value, onChange, placeholder, ...rest }) => {
  return (
    <input
    // focus:outline-none → zruší default outline při focus inputu
      className={`
        px-3 py-2 w-full bg-light border border-gray-700 rounded-xl text-sm text-black
        focus:outline-none
        focus:border-dark
        focus:ring-2 
        focus:ring-gray-600/40
        focus:shadow-lg
        focus:shadow-gray-400  
        transition 
        duration-300 
        ease-in-out`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};
export default Input;
