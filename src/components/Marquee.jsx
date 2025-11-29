import React from "react";
import Marquee from "react-fast-marquee"; 

const gameFaces = [
  "🎮 Consoles",
  "💻 PC Gaming",
  "📱 Mobile",
  "🕹️ Arcade",
  "👾 Retro",
  "⚔️ RPG",
  " FPS",
  "🏎️ Racing",
  "⚽ Sports",
  "🧠 Strategy",
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
            className="text-1xl font-bold px-10 tracking-widest uppercase hover:text-red-500 transition duration-300 cursor-pointer"
          >
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default GameFaceMarquee;
