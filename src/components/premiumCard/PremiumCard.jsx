import React from "react";
import { Link } from "react-router";
import { FaStar, FaArrowRight, FaFire } from "react-icons/fa";
import { motion } from "framer-motion";

const PremiumCard = ({ game }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative group w-full"
    >
      {/* Hover glow */}
      <div className="absolute -inset-px bg-gradient-to-br from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/25 group-hover:to-purple-900/15 rounded-[24px] blur-lg transition-all duration-500 -z-10" />

      <div
        className="h-full rounded-[24px] overflow-hidden border border-purple-900/25 group-hover:border-purple-600/45 transition-all duration-500 relative"
        style={{ backgroundColor: "#0d0d2b" }}
      >
        {/* Badge */}
        <div className="absolute top-4 left-4 z-20">
          {game.price > 0 ? (
            <div className="flex items-center gap-1 bg-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-purple-600/40 font-orbitron">
              <FaFire size={8} /> Premium
            </div>
          ) : (
            <div className="bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest font-orbitron">
              Free
            </div>
          )}
        </div>

        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: "220px", backgroundColor: "#0d0d2b" }}>
          <img
            src={game.image || "https://placehold.co/400x300/0d0d2b/6c3bff?text=GAME"}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ display: "block" }}
          />
          {/* Gradient overlay — dark at bottom */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, #0d0d2b 0%, rgba(13,13,43,0.3) 50%, transparent 100%)" }}
          />

          {/* Hover stats */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <div className="flex items-center gap-1 text-white text-[10px] font-black uppercase tracking-widest bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg font-orbitron">
              <FaStar className="text-yellow-400" size={10} /> 4.8
            </div>
            <div className="flex items-center gap-1 text-white text-[10px] font-black uppercase tracking-widest bg-purple-600/90 backdrop-blur-md px-3 py-1.5 rounded-lg font-orbitron">
              Hot
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5" style={{ backgroundColor: "#0d0d2b" }}>
          <div className="mb-4">
            <h3 className="font-orbitron text-sm font-black uppercase tracking-tight text-white mb-1 group-hover:text-purple-300 transition-colors leading-tight line-clamp-1">
              {game.title}
            </h3>
            <p className="font-rajdhani text-gray-500 text-xs font-semibold uppercase tracking-widest">
              {game.genre || "Action • Strategy"}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-purple-900/25">
            <div className="flex flex-col">
              <span className="font-orbitron text-[9px] text-gray-600 font-bold uppercase tracking-widest mb-0.5">Price</span>
              <div className="flex items-baseline gap-0.5">
                <span className="font-orbitron text-xl font-black text-white">
                  {game.price > 0 ? `$${game.price}` : "FREE"}
                </span>
                {game.price > 0 && (
                  <span className="font-orbitron text-purple-400 text-[10px] font-black uppercase">/mo</span>
                )}
              </div>
            </div>
            <Link
              to={`/details/${game._id}`}
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 border border-purple-700/35 group-hover:shadow-lg group-hover:shadow-purple-600/25"
              style={{ backgroundColor: "rgba(88,28,135,0.25)" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(108,59,255,0.8)"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "rgba(88,28,135,0.25)"}
            >
              <FaArrowRight className="text-white text-xs" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumCard;
