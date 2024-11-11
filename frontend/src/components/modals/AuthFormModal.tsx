import React, { useEffect } from "react";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../1_atoms/Button";
import FormField from "../2_molecules/FormField";
import CloseButton from "../1_atoms/CloseButton";
import Form from "../3_organism/Form";

import { signupUser } from "../../api/signupUser";
import { loginUserApi } from "../../api/loginUser";
import { getUserApi } from "../../api/getUser";

import { useAuthFormContext } from "../../contexts/forms/AuthFormContext";
import { useUserContext } from "../../contexts/UserContext";
import { useModalContext } from "../../contexts/ModalContext";
import { ModalWrapper } from "./ModalWrapper";

interface AuthFormModalProps {
  type: "login" | "signup";
  onClose?: () => void;
  children?: ReactNode; // Pro případ, že bys chtěl přidat další obsah dovnitř modalu
}

const AuthFormModal: React.FC<AuthFormModalProps> = ({ type, onClose, children }) => {
  // sign up and login error message
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // je nutné kvůli konfliktu dispatch přejmenovat na authDispatch
  const { state, dispatch: authDispatch } = useAuthFormContext();
  const { signup, login: authContextLogin } = state;
  // zde také přejmenováním specifikujeme o jaký dispatch se jedná
  const { login: userContextLogin } = useUserContext();

  const { closeModal } = useModalContext();

  const navigate = useNavigate();

  // proměnná co kontrolu jaký typ formuláře se zobrazí
  const [isSignup, setIsSignUp] = useState<boolean>(type === "signup");

  useEffect(() => {
    setIsSignUp(type === "signup");
    setMessage(null);
    setError(null);
  }, [type]);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(e);

    e.preventDefault();
    setMessage(null);
    setError(null);

    // podmínka zajišťuje rozdělení procesu na Signup a Login
    if (isSignup) {
      try {
        const signupResult = await signupUser(signup.email, signup.password, signup.userName);
        if (signupResult.success) {
          setMessage(signupResult.message);
        } else {
          setError(signupResult.message);
        }
        authDispatch({ type: "RESET_FORM", formName: "signup" });
      } catch (error) {
        console.error("An unexpected error occurred during signup:", error);
      }
    } else {
      try {
        // prvně zavoláme API pro zpracování loginu
        const loginResult = await loginUserApi(authContextLogin.email, authContextLogin.password);
        if (loginResult.success) {
          setMessage(loginResult.message);
        } else {
          setError(loginResult.message);
        }
        // poté zavoláme API pro nahraní dat o uživateli
        const getUserResult = await getUserApi();
        if (getUserResult.success && getUserResult.userData) {
          const { userId, email, name } = getUserResult.userData;
          // zde nahráváme data do user context
          userContextLogin(userId, email, name);
          setMessage(getUserResult.message);
          navigate("/dashboard");
          closeModal("login_AuthModalOpen");
        } else {
          setError(getUserResult.message);
        }
        // vymazaní obsahu formuláře
        authDispatch({ type: "RESET_FORM", formName: "login" });
      } catch (error) {
        setError("Login failed, please try again.");
        console.error("Login failed", error);
      }
    }
  };

  return (
    <ModalWrapper>
      <h1 className="font-bold text-2xl text-left">{children}</h1>
      <CloseButton onClick={onClose} />
      <Form id={isSignup ? "signUpForm" : "loginForm"} onSubmit={handleSubmit} noValidate errorMessage={""}>
        <FormField
          id={isSignup ? "signUpEmail" : "loginEmail"}
          label="Email"
          type="email"
          name="email"
          // name={isSignup ? "signUpEmail" : "loginEmail"}
          form={isSignup ? "signUpForm" : "loginForm"}
          formName={type}
          context={useAuthFormContext}
          placeholder="Enter your email"
          required
          errorMessage="Please provide a valid email address."
        />
        <FormField
          id={isSignup ? "signUpPassword" : "loginPassword"}
          label="Password"
          type="password"
          name="password"
          // name={isSignup ? "signUpPassword" : "loginPassword"}
          form={isSignup ? "signUpForm" : "loginForm"}
          formName={type}
          context={useAuthFormContext}
          placeholder="Enter your password"
          required
          errorMessage="Please provide a password"
        />
        {isSignup && (
          <>
            <FormField
              id="signUpName"
              label="Name"
              type="text"
              name="userName"
              form={isSignup ? "signUpForm" : "loginForm"}
              formName={type}
              context={useAuthFormContext}
              placeholder="Your name"
              required
              errorMessage="Please provide your name"
            />
          </>
        )}
        {/* hidden input pro možnost odeslání odentrováním */}
        <input type="submit" hidden />
        <Button className="mt-2" type="submit">
          {children}
        </Button>
      </Form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </ModalWrapper>
  );
};

export default AuthFormModal;
