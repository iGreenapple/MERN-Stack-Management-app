import LoginFormModal from "./LoginFormModal";
import RegisterFormModal from "./RegisterFormModal";

import useUser from "../hooks/useAuth";

const Home = () => {
  const { openLoginModal, openRegisterModal, toggleLoginModal, toggleRegisterModal } = useUser();

  return (
    <div className='flex flex-col gap-10 items-center'>
      <h1 className='home-heading mx-5'>Welcome to the Project management App</h1>
      <LoginFormModal open={openLoginModal} setModal={toggleLoginModal} />
      <RegisterFormModal open={openRegisterModal} setModal={toggleRegisterModal} />
      <div className='flex gap-5'>
        <button onClick={toggleRegisterModal}>Sign up</button>
        <button onClick={toggleLoginModal}>Log In</button>
      </div>
    </div>
  )
}

export default Home