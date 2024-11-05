import Button from "./1_atoms/Button";
import { useModalContext } from "../contexts/ModalContext";

const Home = () => {
  const { openModal } = useModalContext();

  return (
    <div className="flex flex-col gap-10 items-center">
      <h1 className="home-heading mx-5">Welcome to the Project management App</h1>
    </div>
  );
};

export default Home;
