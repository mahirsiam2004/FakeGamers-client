import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  FaGamepad, FaFire, FaShoppingCart, FaClock, FaSearch, FaFilter,
  FaRocket, FaShieldAlt, FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router";
import PremiumCard from "../../components/premiumCard/PremiumCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

const GENRES = ["All", "Action", "Shooter", "Horror", "Racing", "RPG", "Battle Royale", "Indie"];

const Store = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  const { data: games = [], isLoading } = useQuery({
    queryKey: ["store-games"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/games");
      return data;
    },
  });

  const filtered = games.filter((g) => {
    const matchSearch = g.title?.toLowerCase().includes(search.toLowerCase());
    const matchGenre  = genre === "All" || g.genre === genre;
    return matchSearch && matchGenre;
  });

  const features = [
    { icon: <FaGamepad />, title: "Curated Collection",  desc: "Only the best indie and AAA titles make it to our store. Quality guaranteed." },
    { icon: <FaRocket />,  title: "Instant Delivery",    desc: "Download your game immediately after purchase. No waiting, no delays." },
    { icon: <FaShieldAlt />, title: "Secure Payments",   desc: "All transactions protected by Stripe. Your data is always safe with us." },
    { icon: <FaFire />,    title: "Exclusive Drops",     desc: "Limited editions, early access, and developer bundles available here first." },
  ];

  return (
    <div className="min-h-screen bg-[#07071a] text-white">

      {/* ── Hero ── */}
      <section className="relative py-28 overflow-hidden border-b border-purple-900/20">
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-600/8 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-6 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-purple-600/10 border border-purple-600/20 px-4 py-1.5 rounded-full text-purple-400 mb-6">
            <FaFire className="text-sm animate-pulse" />
            <span className="font-orbitron text-[10px] font-bold uppercase tracking-[0.15em]">Premium Game Marketplace</span>
          </div>

          <h1 className="font-orbitron text-6xl md:text-8xl font-black uppercase tracking-tight text-white mb-6">
            GAME <span className="text-purple-400">STORE</span>
          </h1>
          <p className="font-rajdhani text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Discover hand-picked, high-quality games. Instant delivery • Secure payments • Lifetime access.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-xl mx-auto">
            <div className="relative flex-1 w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search games..."
                className="w-full bg-[#0d0d2b] border border-purple-900/30 focus:border-purple-600/50 rounded-xl pl-11 pr-4 py-4 font-rajdhani text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
              />
            </div>
            <Link
              to="/games"
              className="purple-btn font-orbitron text-white font-bold px-8 py-4 rounded-xl uppercase tracking-widest text-[10px] flex items-center gap-2 whitespace-nowrap"
            >
              <FaShoppingCart size={12} /> Browse All
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Genre Filter ── */}
      <section className="py-8 border-b border-purple-900/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={`px-5 py-2 rounded-full font-orbitron text-[10px] font-bold uppercase tracking-widest transition-all duration-200 ${
                  genre === g
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "bg-purple-900/15 border border-purple-800/25 text-gray-400 hover:border-purple-600/40 hover:text-white"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Games Grid ── */}
      <section className="container mx-auto px-6 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="h-80 bg-purple-900/10 animate-pulse rounded-[24px] border border-purple-900/20" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="font-orbitron text-[10px] text-gray-500 uppercase tracking-widest">
                {filtered.length} game{filtered.length !== 1 ? "s" : ""} found
              </p>
              {(search || genre !== "All") && (
                <button
                  onClick={() => { setSearch(""); setGenre("All"); }}
                  className="font-orbitron text-[10px] text-purple-400 hover:text-white uppercase tracking-widest transition-colors"
                >
                  Clear filters ×
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((game, idx) => (
                <motion.div key={game._id || game.id} {...fadeUp(idx * 0.04)}>
                  <PremiumCard game={game} />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-purple-900/5 rounded-[32px] border border-purple-900/20">
            <FaGamepad className="text-purple-800 text-5xl mb-4" />
            <p className="font-orbitron text-gray-500 text-xs uppercase tracking-widest mb-6">No games found</p>
            <button
              onClick={() => { setSearch(""); setGenre("All"); }}
              className="purple-btn font-orbitron text-white font-bold px-8 py-3 rounded-xl uppercase tracking-widest text-[10px]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* ── Features ── */}
      <section className="py-20 border-t border-purple-900/20">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-purple-600/10 border border-purple-600/20 px-4 py-1.5 rounded-full text-purple-400 mb-5">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
              <span className="font-orbitron text-[10px] font-bold uppercase tracking-[0.15em]">Why Choose Us</span>
            </div>
            <h2 className="font-orbitron text-4xl font-black uppercase tracking-tight text-white">
              Store <span className="text-gray-600">Features</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="group bg-[#0d0d2b] border border-purple-900/20 rounded-[20px] p-7 text-center hover:border-purple-600/35 transition-all duration-300"
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 10px 40px rgba(108,59,255,0.12)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div className="w-14 h-14 bg-purple-600/10 border border-purple-600/20 rounded-2xl flex items-center justify-center text-purple-400 text-2xl mb-5 mx-auto group-hover:bg-purple-600/20 group-hover:scale-110 transition-all duration-300">
                  {f.icon}
                </div>
                <h3 className="font-orbitron text-xs font-black uppercase tracking-wide text-white mb-3">{f.title}</h3>
                <p className="font-rajdhani text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coming Soon Banner ── */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <motion.div
            {...fadeUp()}
            className="relative rounded-[32px] overflow-hidden border border-purple-900/30 p-12 text-center"
            style={{ background: "linear-gradient(135deg, #0d0d2b 0%, #12083a 50%, #0d0d2b 100%)" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-orbitron text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
                Full Store <span className="text-purple-400">Coming Soon</span>
              </h2>
              <p className="font-rajdhani text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Wishlists, bundles, reviews, and a full cart system are on the way. Stay tuned!
              </p>
              <Link to="/games" className="inline-flex items-center gap-2 purple-btn font-orbitron text-white font-bold px-10 py-4 rounded-xl uppercase tracking-widest text-[11px]">
                Browse Games Now <FaArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Store;
