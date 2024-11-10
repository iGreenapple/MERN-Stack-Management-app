import React from "react";
import AuthFormModal from "./AuthFormModal";
import { useModalContext } from "../../contexts/ModalContext";
import CreateModal from "./CreateProjectModal";
import { AuthFormProvider } from "../../contexts/forms/AuthFormContext";
import { CreateProjectFormProvider } from "../../contexts/forms/CreateProjectFormContext";

const ModalRenderer: React.FC = () => {
  const { state, closeModal } = useModalContext();

  return (
    <>
      {/* Zabalení AuthForm do jeho AuthFormContext */}
      <AuthFormProvider>
        {state.signup_AuthModalOpen && (
          <AuthFormModal type="signup" onClose={() => closeModal("signup_AuthModalOpen")}>
            Sign up
          </AuthFormModal>
        )}
        {state.login_AuthModalOpen && (
          <AuthFormModal type="login" onClose={() => closeModal("login_AuthModalOpen")}>
            Login
          </AuthFormModal>
        )}
      </AuthFormProvider>
      <CreateProjectFormProvider>
        {state.create_ProjectModalOpen && (
          <CreateModal onClose={() => closeModal("create_ProjectModalOpen")}>Create project</CreateModal>
        )}
      </CreateProjectFormProvider>

      {state.create_TaskModalOpen && (
        <CreateModal onClose={() => closeModal("create_ProjectModalOpen")}>Create project</CreateModal>
      )}
    </>
  );
};

export default ModalRenderer;
