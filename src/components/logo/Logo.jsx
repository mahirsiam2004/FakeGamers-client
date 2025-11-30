import React from "react";

const Logo = () => {
  return (
    <h2
      className="
      text-4xl font-extrabold text-black 
      relative inline-block 
      transition-all duration-300 
      hover:scale-110 hover:text-transparent 
      bg-clip-text
      fancy
      hover:bg-gradient-to-r hover:from-red-600 hover:to-black
    "
    >
      FAKE
      <span className="text-red-500     ">
        GAMERS
      </span>

      <span
        className="
        absolute left-0 -bottom-1 w-0 h-[3px] 
        bg-gradient-to-r from-red-500 to-gray-100 
        transition-all duration-300 
        group-hover:w-full
      "
      ></span>
    </h2>
  );
};

export default Logo;
