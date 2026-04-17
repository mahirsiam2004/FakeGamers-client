import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";
import PremiumCard from "../../components/premiumCard/PremiumCard";
import { FaSearch, FaFilter } from "react-icons/fa";

const GENRES = ["All", "Action", "Shooter", "Horror", "Racing", "RPG", "Battle Royale", "Indie"];

const GamesPage = () => {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  const { data: games = [], isLoading, error } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/games`);
      return result.data;
    },
  });

  const filtered = games.filter((g) => {
    const matchSearch = g.title?.toLowerCase().includes(search.toLowerCase());
    const matchGenre  = genre === "All" || g.genre === genre;
    return matchSearch && matchGenre;
  });

  return (
    <div className="bg-[#07071a] min-h-screen py-24 px-6">
      {/* bg glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-600/10 border border-purple-600/20 px-4 py-1.5 rounded-full text-purple-400 text-[11px] font-black uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
            Most Complete
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none">
            Game <span className="text-gray-600">Collection</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-transparent mx-auto mt-8 rounded-full" />
        </motion.div>

        {/* Search + Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-12 max-w-3xl mx-auto"
        >
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search games..."
              className="w-full bg-[#0d0d2b] border border-purple-900/30 focus:border-purple-600/50 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="bg-[#0d0d2b] border border-purple-900/30 focus:border-purple-600/50 rounded-xl pl-11 pr-8 py-3.5 text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </motion.div>

        {/* Genre Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                genre === g
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "bg-purple-900/20 border border-purple-800/30 text-gray-400 hover:border-purple-600/40 hover:text-white"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map((i) => (
              <div key={i} className="h-80 bg-purple-900/10 animate-pulse rounded-[24px] border border-purple-900/20" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-purple-400 font-bold uppercase tracking-widest">Failed to load games.</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((game, idx) => (
              <motion.div
                key={game._id || game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <PremiumCard game={game} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-purple-900/5 rounded-[40px] border border-purple-900/20">
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-6">
              No games found.
            </p>
            <button
              onClick={() => { setSearch(""); setGenre("All"); }}
              className="purple-btn text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Count */}
        {!isLoading && !error && (
          <p className="text-center text-gray-600 text-xs font-bold uppercase tracking-widest mt-10">
            Showing {filtered.length} of {games.length} games
          </p>
        )}
      </div>
    </div>
  );
};

export default GamesPage;
