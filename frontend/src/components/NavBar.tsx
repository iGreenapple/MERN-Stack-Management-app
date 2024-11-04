import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "./1_atoms/Button";
import { useModalContext } from "../contexts/ModalContext";
import { useUserContext } from "../contexts/UserContext";

const NavBar = () => {
  // const { isAuthenticated, toggleLoginModal, toggleRegisterModal, handleLogout } = useAuth();

  // const { state, openModal, closeModal } = useModalContext();

  const navigate = useNavigate();

  // Načítaní uživatelských dat z userContext skrze useUserContext
  const { state: userState, logout } = useUserContext();

  return (
    <nav className="w-full flex justify-between items-center py-5 top-0">
      <NavLink to="/" className="logo font-medium text-dark text-4xl ml-7">
        Project | M
      </NavLink>
      <ul className="w-[20%] flex gap-6 mr-8">
        {!userState.isAuthenticated ? (
          <>
            <p>User not login</p>
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <p>user: {userState.email}</p>
              <p>name: {userState.name}</p>
            </div>

            <NavLink to="/dashboard">
              <Button>Dashboard</Button>
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
