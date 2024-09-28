import React, { useEffect } from "react";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

import FormField from "./2_molecules/FormField";
import Button from "./1_atoms/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { registerUser } from "../api/registerUser";
import { loginUser } from "../api/loginUser";
import useAuth from "../hooks/useAuth";

interface AuthModalFormProps {
  type: "login" | "signup" | null;
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  children?: ReactNode; // Pro případ, že bys chtěl přidat další obsah dovnitř modalu
}

const AuthModalForm: React.FC<AuthModalFormProps> = ({ type, isOpen, onClose, title, children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  // validation states
  const [emailValid, setEmailValid] = useState(true); // Stav validace emailu
  const [passwordValid, setPasswordValid] = useState(true); // Stav validace hesla
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  // error message states
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setpasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  const navigate = useNavigate();

  // const { isAuthenticated, toggleLoginModal, toggleRegisterModal, handleLogout } = useAuth();

  // proměnná co kontrolu jaký typ formuláře se zobrazí
  const [isSignup, setIsSignUp] = useState<boolean>(type === "signup");
  console.log(isSignup);

  useEffect(() => {
    setIsSignUp(type === "signup");
  }, [type]);

  // let isSignup = type === "signup";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validace registrace
    setEmailValid(email.includes("@"));
    setPasswordValid(password.length >= 6);
    setConfirmPasswordValid(password === confirmPassword);
    setNameValid(name.length > 0);
    // první podmínka zajišťuje rozdělení procesu na Signup a Login
    if (isSignup) {
      // pro Signup prováníme kontrolu jednotlivých vstupů
      if (!emailValid) {
        setEmailError("Please enter a valid email address.");
      }
      if (!passwordValid) {
        setpasswordError("Password must be at least 6 characters long.");
      }
      if (!confirmPasswordValid) {
        setConfirmPasswordError("Passwords do not match.");
      }
      if (!nameValid) {
        setNameError("Your name is missing.");
      } else {
        try {
          await registerUser(email, password, name);
          console.log("Signup successful!");
          // vymaže states pro email a password a změní form na Login
          setEmail("");
          setPassword("");
          setIsSignUp(!isSignup);
        } catch (error) {
          console.error("Registration failed", error);
        }
      }
    } else {
      // validace login
      if (!emailValid) {
        setEmailError("Please enter a valid email address.");
      }
      if (!passwordValid) {
        setpasswordError("Password must be at least 6 characters long.");
      } else {
        try {
          await loginUser(email, password);
          console.log("Login successful!");
          navigate("/dashboard");
        } catch (error) {
          console.error("Login failed", error);
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    // modal backdrop → pozadí kolem modalu, na které když kliknu tak se modal zavře
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* e.stopPropagation() zamezí provedení eventu v nadřazeném tagu, takže se modal nezavře při kliknutí do něj */}
      <div
        className="absolute flex flex-col gap-4 bg-white p-10 rounded-2xl border-2 border-solid border-dark shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* primárně bere prop title, pokud není tak podle type */}
        <h1 className="font-bold text-2xl text-left">{title || (isSignup ? "Sign up" : "Login")}</h1>
        <button className="absolute w-10 h-10 top-2 right-2" onClick={onClose}>
          <FontAwesomeIcon icon="xmark" size="2xl" />
        </button>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit} noValidate>
          <FormField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            errorMessage={emailError}
            isValid={emailValid}
          />
          <FormField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            errorMessage={passwordError}
            isValid={passwordValid}
          />
          {isSignup && (
            <>
              <FormField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                errorMessage={confirmPasswordError}
                isValid={confirmPasswordValid}
              />
              <FormField
                label="Name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                errorMessage={nameError}
                isValid={nameValid}
              />
            </>
          )}
          <input type="submit" hidden />
          <Button className="mt-5" type="submit">{title || (isSignup ? "Sign up" : "Login")}</Button>
        </form>
      </div>
    </div>
  );
};

export default AuthModalForm;
