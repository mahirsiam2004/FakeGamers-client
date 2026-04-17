import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import { FaGamepad } from "react-icons/fa";

const MyGames = () => {
  const { user } = useAuth();

  const { data: games = [], isLoading, refetch } = useQuery({
    queryKey: ["myGames", user?.email],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/my-games/${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = (id) => {
    toast.error("Delete clicked (no functionality yet)");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07071a] py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
            My <span className="text-purple-400">Games</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">{games.length} game{games.length !== 1 ? "s" : ""} uploaded</p>
        </div>

        {games.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-purple-900/5 rounded-[32px] border border-purple-900/20">
            <FaGamepad className="text-purple-800 text-5xl mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No games uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, idx) => (
              <motion.div
                key={game._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[#0d0d2b] rounded-[24px] overflow-hidden border border-purple-900/20 hover:border-purple-600/30 transition-all duration-300 group"
              >
                {/* Badge */}
                <div className="relative">
                  {game.price > 0 ? (
                    <span className="absolute top-3 right-3 z-10 bg-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      Premium
                    </span>
                  ) : (
                    <span className="absolute top-3 right-3 z-10 bg-green-500/90 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      Free
                    </span>
                  )}
                  <div className="h-44 overflow-hidden">
                    <img
                      src={game.image || "https://via.placeholder.com/400x300/0d0d2b/6c3bff?text=NO+IMAGE"}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d2b]/60 to-transparent" />
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h2 className="text-base font-black uppercase tracking-tight text-white truncate">{game.title}</h2>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{game.genre}</p>
                  <p className="text-purple-400 font-black text-lg">
                    {game.price > 0 ? `$${game.price}` : "FREE"}
                  </p>

                  <div className="flex gap-3 pt-3">
                    <button className="flex-1 bg-purple-900/20 hover:bg-purple-900/40 border border-purple-800/30 text-gray-300 hover:text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs font-bold uppercase tracking-widest">
                      <FiEdit2 size={12} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(game._id)}
                      className="flex-1 bg-red-900/20 hover:bg-red-600/30 border border-red-900/30 hover:border-red-600/40 text-red-400 hover:text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs font-bold uppercase tracking-widest"
                    >
                      <FiTrash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGames;
