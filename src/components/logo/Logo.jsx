import React from "react";
import { FaGamepad } from "react-icons/fa";

const Logo = () => {
  return (
    <span className="inline-flex items-center gap-2 group">
      <span className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-900 rounded-lg flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:shadow-purple-600/60 transition-all">
        <FaGamepad className="text-white text-sm" />
      </span>
      <span className="text-2xl font-black tracking-tight text-white">
        fake<span className="text-purple-400">gamers</span>
      </span>
    </span>
  );
};

export default Logo;
