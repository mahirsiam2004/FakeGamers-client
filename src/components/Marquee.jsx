import React from "react";
import Marquee from "react-fast-marquee"; 
import { 
  FaGamepad, 
  FaLaptop, 
  FaMobileAlt, 
  FaGhost, 
  FaSpaceShuttle, 
  FaCrosshairs, 
  FaCar, 
  FaFutbol, 
  FaBrain,
  FaSkull
} from "react-icons/fa";

const gameFaces = [
  { name: "Consoles", icon: <FaGamepad /> },
  { name: "PC Gaming", icon: <FaLaptop /> },
  { name: "Mobile", icon: <FaMobileAlt /> },
  { name: "Arcade", icon: <FaGhost /> },
  { name: "Retro", icon: <FaSpaceShuttle /> },
  { name: "RPG", icon: <FaSkull /> },
  { name: "FPS", icon: <FaCrosshairs /> },
  { name: "Racing", icon: <FaCar /> },
  { name: "Sports", icon: <FaFutbol /> },
  { name: "Strategy", icon: <FaBrain /> },
];

const GameFaceMarquee = () => {
  return (
    <div className="w-full text-black py-4 ">
      <Marquee
        speed={60} 
        gradient={true}
        pauseOnHover={true} 
        direction="left" 
        className="text-black"
      >
        {gameFaces.map((item, index) => (
          <span
            key={index}
            className="text-1xl font-bold px-10 tracking-widest uppercase hover:text-red-500 transition duration-300 cursor-pointer flex items-center gap-2"
          >
            {item.icon} {item.name}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default GameFaceMarquee;
