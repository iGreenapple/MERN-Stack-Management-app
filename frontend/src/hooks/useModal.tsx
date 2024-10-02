import { useState } from "react";

interface UseModalReturn {
  openAuthModal: boolean;
  toggleAuthModal: () => void;
}

const useModal = (): UseModalReturn => {
  
  const [openAuthModal, setLoginModal] = useState(false);

  const toggleAuthModal = () => {
    setLoginModal(!openAuthModal)
  };


  return { openAuthModal, toggleAuthModal }
}

export default useModal