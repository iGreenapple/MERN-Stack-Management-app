import { useState } from "react";

interface UseUserReturn {
  openLoginModal: boolean;
  openRegisterModal: boolean;
  toggleLoginModal: () => void;
  toggleRegisterModal: () => void;
}

const useAuth = (): UseUserReturn => {

  const [openLoginModal, setLoginModal] = useState(false);
  const [openRegisterModal, setregisterModal] = useState(false);

  const toggleLoginModal = () => {
    setLoginModal(!openLoginModal)
  };
  const toggleRegisterModal = () => {
    setregisterModal(!openRegisterModal)
  };

  return { openLoginModal, openRegisterModal, toggleLoginModal, toggleRegisterModal }
}

export default useAuth