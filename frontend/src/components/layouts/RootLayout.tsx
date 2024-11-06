import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";
import ModalRenderer from "../modals/ModalRenderer";

import { SideBar } from "../SideBar";
import { useUserContext } from "../../contexts/UserContext";

export const RootLayout = () => {
  const { state: userState } = useUserContext();
  return (
    <div className="bg-light p-5 h-screen">
      <div className="h-full flex flex-col flex-auto border-2 ring ring-gray-400/10 border-gray-400/60 rounded-xl shadow-xl overflow-hidden">
        <div className="flex flex-auto">
          {userState.isAuthenticated && <SideBar/>}
          <div className="flex flex-col flex-auto">
            <header className="bg-light border-b-2 border-gray-600/60">
              <NavBar />
            </header>
            <main className="bg-light flex flex-auto justify-center items-center">
              <Outlet />
            </main>
          </div>
        </div>
        <footer className="bg-light py-4 text-dark text-center text-sm border-t-2 border-gray-600/60">Ondřej Staněk ©2024</footer>
      </div>

      {/* ModalRenderer se vykreslí na úrovni RootLayout, tedy je i součástí RouteProvideru */}
      <ModalRenderer />
    </div>
  );
};
