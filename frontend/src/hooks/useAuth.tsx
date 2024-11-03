import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserApi } from "../api/loginUser";
import { logoutUser } from "../api/logoutUser";

interface UseAuthReturn {
  isAuthenticated: boolean;
  openLoginModal: boolean;
  openRegisterModal: boolean;
  toggleLoginModal: () => void;
  toggleRegisterModal: () => void;
  handleSignup: (email: string, password: string, name: string) => Promise<any>;
  handleLogin: (email: string, password: string) => Promise<any>;
  handleLogout: () => void;
}

const useAuth = (): UseAuthReturn => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [openLoginModal, setLoginModal] = useState(false);
  const [openRegisterModal, setregisterModal] = useState(false);

  const toggleLoginModal = () => {
    setLoginModal(!openLoginModal);
  };
  const toggleRegisterModal = () => {
    setregisterModal(!openRegisterModal);
  };

  const handleSignup = async (email: string, password: string, name: string) => {};

  const handleLogin = async (email: string, password: string) => {
    const user = await loginUserApi(email, password);
    if (user) {
      setIsAuthenticated(true);
      toggleLoginModal();
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
    navigate("/");
  };

  return {
    isAuthenticated,
    openLoginModal,
    openRegisterModal,
    toggleLoginModal,
    toggleRegisterModal,
    handleSignup,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;
