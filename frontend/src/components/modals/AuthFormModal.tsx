import React, { useEffect } from "react";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../1_atoms/Button";
import FormField from "../2_molecules/FormField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { signupUser } from "../../api/signupUser";
import { loginUserApi } from "../../api/loginUser";
import { getUserApi } from "../../api/getUser";

import { useAuthContext } from "../../contexts/AuthContext";
import { useUserContext } from "../../contexts/UserContext";
import CloseButton from "../1_atoms/CloseButton";
import Form from "../3_organism/Form";

interface AuthFormModalProps {
  type: "login" | "signup" | null;
  onClose?: () => void;
  title?: string;
  children?: ReactNode; // Pro případ, že bys chtěl přidat další obsah dovnitř modalu
}

const AuthFormModal: React.FC<AuthFormModalProps> = ({ type, onClose, title }) => {
  // sign up and login error message
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // je nutné kvůli konfliktu dispatch přejmenovat na authDispatch
  const { state, dispatch: authDispatch } = useAuthContext();
  const { signup, login: authContextLogin } = state;
  // zde také přejmenováním specifikujeme o jaký dispatch se jedná
  const { login: userContextLogin } = useUserContext();


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
        authDispatch({ type: "RESET_FORM" });
      } catch (error) {
        console.error("An unexpected error occurred during signup:", error);
      }
    } else {
      try {
        const loginResult = await loginUserApi(authContextLogin.email, authContextLogin.password);
        console.log(loginResult);

        const getUserResult = await getUserApi();

        if (getUserResult.success && getUserResult.userData) {
          const { userId, email, name } = getUserResult.userData 
          userContextLogin( userId, email, name)
          // userDispatch({ type: "SET_USER", payload: getUserResult.userData });
          setMessage(getUserResult.message);
          // navigate("/dashboard");
        } else {
          setError(getUserResult.message);
          console.error("Login failed:", getUserResult.message);
        }
        // vymazaní obsahu formuláře
        authDispatch({ type: "RESET_FORM" });
      } catch (error) {
        setError("Login failed, please try again.");
        console.error("Login failed", error);
      }
    }
  };

  // if (!isOpen) return null;

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
        <CloseButton onClick={onClose} />
        <Form onSubmit={handleSubmit} noValidate errorMessage={""}>
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
        </Form>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default AuthFormModal;
