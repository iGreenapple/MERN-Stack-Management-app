import React, { useContext, useEffect } from "react";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./1_atoms/Button";
import FormField from "./2_molecules/FormField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { signupUser } from "../api/signupUser";
import { loginUserApi } from "../api/loginUser";

import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";

interface AuthModalFormProps {
  type: "login" | "signup" | null;
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  children?: ReactNode; // Pro případ, že bys chtěl přidat další obsah dovnitř modalu
}

const AuthModalForm: React.FC<AuthModalFormProps> = ({ type, isOpen, onClose, title }) => {
  // sign up and login error message
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  if (!authContext) {
    throw new Error("SignUpContext must be used within a SignUpProvider");
  }
  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  // AuthContext - je nutné kvůli konfliktu dispatch přejmenovat na authDispatch
  const { signup, login } = authContext.state;
  const { dispatch: authDispatch } = authContext;
  // UserContext - zde také specifikujeme o jaký dispatch se jedná
  const { dispatch: userDispatch } = userContext;

  const navigate = useNavigate();

  // proměnná co kontrolu jaký typ formuláře se zobrazí
  const [isSignup, setIsSignUp] = useState<boolean>(type === "signup");

  useEffect(() => {
    setIsSignUp(type === "signup");
    setMessage(null);
    setError(null);
  }, [type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    console.log(signup.email, signup.password, signup.userName);

    // podmínka zajišťuje rozdělení procesu na Signup a Login
    if (isSignup) {
      try {
        const result = await signupUser(signup.email, signup.password, signup.userName);
        if (result.success) {
          setMessage(result.message);
        } else {
          setError(result.message);
        }
        // Nastaví úspěšnou zprávu
        // vymaže states pro email a password a změní form na Login
        // setEmail("");
        // setPassword("");
        // setIsSignUp(!isSignup);
        authDispatch({ type: "RESET_FORM" });
      } catch (error) {
        console.error("An unexpected error occurred during signup:", error);
      }
    } else {
      try {
        const result = await loginUserApi(login.email, login.password);
        console.log(result);

        if (result.success && result.userData) {
          userDispatch({ type: "SET_USER", payload: result.userData });
          setMessage(result.message);
          navigate("/dashboard");
        } else {
          setError(result.message);
          console.error("Login failed:", result.message);
        }
        // vymazaní obsahu formuláře
        authDispatch({ type: "RESET_FORM" });
      } catch (error) {
        setError("Login failed, please try again.");
        console.error("Login failed", error);
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
        <form className="flex flex-col gap-1" onSubmit={handleSubmit} noValidate>
          <FormField
            label="Email"
            type="email"
            name={isSignup ? "signUpEmail" : "loginEmail"}
            placeholder="Enter your email"
            required
            errorMessage="Please provide a valid email address."
          />
          <FormField
            label="Password"
            type="password"
            name={isSignup ? "signUpPassword" : "loginPassword"}
            placeholder="Enter your password"
            required
            errorMessage="Please provide a password"
          />
          {isSignup && (
            <>
              {/* <FormField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                // value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                errorMessage={confirmPasswordError}
              /> */}
              <FormField
                label="Name"
                type="text"
                name="signUpName"
                placeholder="Your name"
                required
                errorMessage="Please provide your name"
              />
            </>
          )}
          <input type="submit" hidden />
          <Button className="mt-2" type="submit">
            {title || (isSignup ? "Sign up" : "Login")}
          </Button>
        </form>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default AuthModalForm;
