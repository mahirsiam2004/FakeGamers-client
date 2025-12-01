import React from "react";

const PremiumCard = ({ game }) => {
  const isUltraPremium = game.price > 100;

  return (
    <div className="relative w-72 group mono">
      <div className="h-full bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-black transform transition-all duration-500 hover:scale-105 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(239,3,3,0.3)]">

        {/* ULTRA PREMIUM RIBBON */}
        {isUltraPremium && (
          <div className="absolute -top-1 -left-12 w-56 rotate-[-45deg] z-20">
            <div className="bg-gradient-to-r from-red-600 via-red-500 to-black text-white text-center py-2 font-black text-lg tracking-wider border-t-2 border-b-2 border-white shadow-md">
              ULTRA PREMIUM
            </div>
          </div>
        )}

        {/* PREMIUM TAG */}
        {game.price > 0 && !isUltraPremium && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full font-black text-xs uppercase tracking-wider shadow z-10 border-2 border-white">
            Premium
          </div>
        )}

        {/* GAME IMAGE */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={game.image || "https://via.placeholder.com/300x200"}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <h3 className="text-2xl font-black drop-shadow">{game.title}</h3>
          </div>
        </div>

        {/* CARD CONTENT */}
        <div className="p-4 text-center space-y-3">
          <p className="text-gray-600 font-bold uppercase text-sm">{game.genre || "Action • Shooter"}</p>

          <div className="py-2">
            <span className="text-3xl md:text-4xl font-black text-red-600">${game.price}</span>
            {game.originalPrice && (
              <span className="block text-sm text-gray-400 line-through">${game.originalPrice}</span>
            )}
          </div>

          {/* VIP FEATURES */}
          <div className="space-y-1 text-left bg-gray-100 px-3 py-2 rounded-xl border-2 border-dashed border-red-600 text-sm font-bold">
            <p className="flex items-center gap-2"><span className="text-red-600">✓</span> Early Access</p>
            <p className="flex items-center gap-2"><span className="text-red-600">✓</span> Exclusive Skins</p>
            <p className="flex items-center gap-2"><span className="text-red-600">✓</span> No Ads Forever</p>
          </div>

          {/* BUY BUTTON */}
          <button className="w-full bg-black hover:bg-red-600 text-white font-black text-lg py-3 rounded-xl uppercase tracking-widest transform hover:scale-105 transition duration-300 shadow border-2 border-red-600">
            Get Now
          </button>
        </div>

        {/* HOVER GLOW */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-black/20 blur-xl"></div>
        </div>

      </div>
    </div>
  );
};

export default PremiumCard;
