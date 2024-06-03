import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../api/loginUser";
import { logoutUser } from "../api/logoutUser";


interface UseUserReturn {
  isAuthenticated: boolean;
  openLoginModal: boolean;
  openRegisterModal: boolean;
  toggleLoginModal: () => void;
  toggleRegisterModal: () => void;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

const useAuth = (): UseUserReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [openLoginModal, setLoginModal] = useState(false);
  const [openRegisterModal, setregisterModal] = useState(false);
  const navigate = useNavigate();

  const toggleLoginModal = () => {
    setLoginModal(!openLoginModal)
  };
  const toggleRegisterModal = () => {
    setregisterModal(!openRegisterModal)
  };

  const handleLogin = async (email: string, password: string) => {
    const user = await loginUser(email, password)
    if (user) {
      setIsAuthenticated(true);
      toggleLoginModal();
      navigate('/dashboard');
    }
  }

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
    navigate('/');
  };

  return { isAuthenticated, openLoginModal, openRegisterModal, toggleLoginModal, toggleRegisterModal, handleLogin, handleLogout }
}

export default useAuth