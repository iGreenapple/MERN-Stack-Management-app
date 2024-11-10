import React from "react";
import { NavLink } from "react-router-dom";

interface SideBarItemProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
  redirectTo?: string;
  onClick?: () => void;
}

export const SideBarItem: React.FC<SideBarItemProps> = ({ icon, label, className, redirectTo, onClick }) => {
  return (
    <div className="relative mt-2 flex items-center group">
      {/* Ikona */}
      {redirectTo ? (
        <NavLink to={redirectTo}>
          <div className="text-light font-xl p-2 cursor-pointer hover:bg-lightgrey rounded-full">{icon}</div>
        </NavLink>) : (
          <div className="text-light font-xl p-2 cursor-pointer hover:bg-lightgrey rounded-full"onClick={onClick}>{icon}</div>
        )}
      
    

      {/* Popisek viditelný při hover */}
      <span
        className="absolute left-[50px] bg-dark text-white text-sm py-4 px-2 rounded-md opacity-0 
                 group-hover:opacity-100 group-hover:translate-x-0 translate-x-[-10px] transition-all ease-in duration-600"
      >
        {label}
      </span>
    </div>
  );
};
