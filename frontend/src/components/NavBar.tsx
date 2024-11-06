import { NavLink } from "react-router-dom";
import Button from "./1_atoms/Button";
import { useModalContext } from "../contexts/ModalContext";
import { useUserContext } from "../contexts/UserContext";

export const NavBar = () => {
  // const { isAuthenticated, toggleLoginModal, toggleRegisterModal, handleLogout } = useAuth();

  const { state, openModal, closeModal } = useModalContext();

  // Načítaní uživatelských dat z userContext skrze useUserContext
  const { state: userState, logout } = useUserContext();

  return (
    <nav className="w-full flex items-center py-5">
      <NavLink to="/" className="logo font-medium text-dark text-4xl ml-7">
        Project | M
      </NavLink>
      <ul className="w-64 ml-auto mr-5 fle items-center gap-6">
        {!userState.isAuthenticated ? (
          <div className="flex gap-6">
            <Button type="button" onClick={() => openModal("signup_AuthModalOpen")}>
              Sign up
            </Button>
            <Button type="button" onClick={() => openModal("login_AuthModalOpen")}>
              Login
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <img></img>
              <p>user: {userState.email}</p>
              <p>name: {userState.name}</p>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
};
