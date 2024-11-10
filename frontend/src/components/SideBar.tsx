import React from "react";
import { SideBarItem } from "./SideBarItem";
import { useUserContext } from "../contexts/UserContext";
import { FiGrid, FiHelpCircle, FiPower, FiSettings } from "react-icons/fi";

interface SideBarProps {
  className?: string;
}

export const SideBar: React.FC<SideBarProps> = ({ className }) => {
  const { logout } = useUserContext();
  return (
    <aside className={`${className} w-16 bg-dark text-light flex flex-col justify-center items-center gap-6 border-r-2 border-gray-600/60`}>
      <SideBarItem icon={<FiGrid size={28} />} label="Dashboard" redirectTo="/dashboard" />
      <SideBarItem icon={<FiSettings size={28} />} label="Settings/Home" redirectTo="/" />
      <SideBarItem icon={<FiHelpCircle size={28} />} label="About" redirectTo="/about" />
      <SideBarItem icon={<FiPower size={28} />} label="Logout" onClick={logout} />
    </aside>
  );
};
