import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

// do props naší komponenty vkládáme všechny default input atributy
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// rest představuje všechny explicitně nevyjádřené atributy
const Input: React.FC<InputProps> = ({ className, type, name, placeholder, minLength, ...rest }) => {
  // Volání signup kontextu
  const authContext = useContext(AuthContext);
  // kontrola existence kontextu a vyloučení undefined
  if (!authContext) {
    throw new Error("SignUpContext must be used within a SignUpProvider");
  }
  // destructure objektu state obsaženého v signup kontextu
  // const { email, password, userName } = signupContext.state;
  // vytažení dispatch fce z kontextu
  const { dispatch } = authContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (name === "signUpEmail") {
      dispatch({ type: "SET_SIGNUP_EMAIL", payload: value });
    } else if (name === "signUpPassword") {
      dispatch({ type: "SET_SIGNUP_PASSWORD", payload: value });
    } else if (name === "signUpName") {
      dispatch({ type: "SET_SIGNUP_NAME", payload: value });
    } else if (name === "loginEmail") {
      dispatch({ type: "SET_LOGIN_EMAIL", payload: value });
    } else if (name === "loginPassword") {
      dispatch({ type: "SET_LOGIN_PASSWORD", payload: value });
    }
  };

  return (
    <input
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
      // value={value}
      onChange={handleChange}
      placeholder={placeholder}
      // minLength={minLength}
      {...rest}
    />
  );
};
export default Input;
