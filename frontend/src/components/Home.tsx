import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginFormModal from "./LoginFormModal";
import RegisterFormModal from "./RegisterFormModal";

import useAuth from "../hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const { openLoginModal, openRegisterModal, toggleLoginModal, toggleRegisterModal } = useAuth();

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate]);

  // const handleLogin = () => {
  //   setIsAuthenticated(true);
  //   toggleLoginModal();
  // };

  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  //   localStorage.removeItem('token');
  // };

  return (
    <div className='flex flex-col gap-10 items-center'>
      <h1 className='home-heading mx-5'>Welcome to the Project management App</h1>
      <LoginFormModal open={openLoginModal} setModal={toggleLoginModal} />
      <RegisterFormModal open={openRegisterModal} setModal={toggleRegisterModal} setLoginModal={toggleLoginModal} />
      <div className='flex gap-5'>
        <button onClick={toggleRegisterModal}>Register</button>
        <button onClick={toggleLoginModal}>Log In</button>
      </div>
    </div>
  )
}

export default Home