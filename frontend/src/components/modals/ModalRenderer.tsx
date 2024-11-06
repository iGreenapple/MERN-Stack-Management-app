import React from "react";
import AuthFormModal from "./AuthFormModal";
import { useModalContext } from "../../contexts/ModalContext";
import CreateModal from "./CreateProjectModal";

const ModalRenderer: React.FC = () => {
  const { state, closeModal } = useModalContext();

  return (
    <>
      {state.signup_AuthModalOpen && <AuthFormModal type="signup" onClose={() => closeModal("signup_AuthModalOpen")} />}
      {state.login_AuthModalOpen && <AuthFormModal type="login" onClose={() => closeModal("login_AuthModalOpen")} />}
      {state.create_ProjectModalOpen && (
        <CreateModal onClose={() => closeModal("create_ProjectModalOpen")}>Create project</CreateModal>
      )}
      {state.create_TaskModalOpen && <AuthFormModal type="login" onClose={() => closeModal("create_TaskModalOpen")} />}
    </>
  );
};

export default ModalRenderer;
