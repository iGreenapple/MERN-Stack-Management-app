import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "./1_atoms/Button";
import { useModalContext } from "../contexts/ModalContext";

const NavBar = () => {
  const { isAuthenticated, toggleLoginModal, toggleRegisterModal, handleLogout } = useAuth();

  const { state, openModal, closeModal } = useModalContext();

  // Načítaní uživatelských dat z userContext skrze useUserContext
  // const { state: userState } = useUserContext();
  // const { userId, email, name } = userState;

  return (
    <nav className="w-full flex justify-between items-center py-5 top-0">
      <NavLink to="/" className="logo font-medium text-dark text-4xl ml-7">
        Project | M
      </NavLink>
      <ul className="w-[20%] flex gap-6 mr-8">
        {isAuthenticated ? (
          <>
            <NavLink className="logo text-lg" to="/dashboard">
              Dashboard |
            </NavLink>
            <Button type="button" onClick={handleLogout}></Button>
          </>
        ) : (
          <>
            <Button type="button" onClick={() => openModal("signup_AuthModalOpen")}>
          Sign up
        </Button>
        <Button type="button" onClick={() => openModal("login_AuthModalOpen")}>
          Login
        </Button>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
