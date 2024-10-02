import { useState } from "react";

import AuthModalForm from "./AuthModalForm";
import Button from "./1_atoms/Button";
import { AuthProvider } from "../contexts/AuthContext";

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"login" | "signup" | null>(null);

  const handleOpenModal = (type: "login" | "signup") => {
    setModalType(type);
    setIsAuthModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAuthModalOpen(false);
    setModalType(null);
  };

  return (
    <div className="flex flex-col gap-10 items-center">
      <h1 className="home-heading mx-5">Welcome to the Project management App</h1>
      <div className="px-40 w-full flex gap-5">
        <Button type="button" onClick={() => handleOpenModal("signup")}>
          Sign up
        </Button>
        <Button type="button" onClick={() => handleOpenModal("login")}>
          Login
        </Button>
      </div>
      <AuthProvider>
        <AuthModalForm type={modalType} isOpen={isAuthModalOpen} onClose={handleCloseModal} />
      </AuthProvider>
    </div>
  );
};

export default Home;
