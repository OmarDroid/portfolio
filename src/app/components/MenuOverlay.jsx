import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({ links }) => {
  // Get the current path to determine active link
  const getCurrentSection = () => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      return hash ? hash.substring(1) : "";
    }
    return "";
  };

  return (
    <ul className="flex flex-col py-4 items-center bg-[#121212]/95 backdrop-blur-sm shadow-lg w-full absolute top-full left-0 z-50 border-b border-gray-800">
      {links.map((link, index) => (
        <li key={index} className="w-full text-center py-3 hover:bg-gray-800/50">
          <NavLink 
            href={link.path} 
            title={link.title} 
            active={getCurrentSection() === link.path.substring(1)}
          />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
