import Button from "./1_atoms/Button";
import { useModalContext } from "../contexts/ModalContext";

const Home = () => {
  const { openModal } = useModalContext();

  return (
    <div className="flex flex-col gap-10 items-center">
      <h1 className="home-heading mx-5">Welcome to the Project management App</h1>
      <div className="px-40 w-full flex gap-5">
        <Button type="button" onClick={() => openModal("signup_AuthModalOpen")}>
          Sign up
        </Button>
        <Button type="button" onClick={() => openModal("login_AuthModalOpen")}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Home;
