import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  FaCalendarAlt, FaClock, FaFire, FaUser, FaEye, FaNewspaper,
} from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

const News = () => {
  const axiosPublic = useAxiosPublic();

  const { data: newsArticles = [], isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/news");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07071a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <p className="font-orbitron text-purple-400 text-xs uppercase tracking-widest">Loading News...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07071a] text-white">

      {/* ── Hero ── */}
      <section className="relative py-28 overflow-hidden border-b border-purple-900/20">
        {/* bg grid */}
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        {/* glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-600/8 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-6 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-purple-600/10 border border-purple-600/20 px-4 py-1.5 rounded-full text-purple-400 mb-6">
            <FaFire className="text-sm" />
            <span className="font-orbitron text-[10px] font-bold uppercase tracking-[0.15em]">Latest News & Updates</span>
          </div>

          <h1 className="font-orbitron text-6xl md:text-8xl font-black uppercase tracking-tight text-white mb-6">
            NEWS <span className="text-purple-400">HUB</span>
          </h1>
          <p className="font-rajdhani text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Stay up to date with patches, events, esports, and everything happening in the gaming world.
          </p>
        </motion.div>
      </section>

      {/* ── Articles Grid ── */}
      <section className="container mx-auto px-6 py-20">
        {newsArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 bg-purple-900/5 rounded-[32px] border border-purple-900/20">
            <FaNewspaper className="text-purple-800 text-5xl mb-4" />
            <p className="font-orbitron text-gray-500 text-xs uppercase tracking-widest">No news articles yet.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {newsArticles.map((article, index) => (
              <motion.article
                key={article._id || index}
                {...fadeUp(index * 0.07)}
                className="group bg-[#0d0d2b] border border-purple-900/20 rounded-[24px] overflow-hidden hover:border-purple-600/40 transition-all duration-400"
                style={{ transition: "border-color 0.3s, box-shadow 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 20px 60px rgba(108,59,255,0.15)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden" style={{ backgroundColor: "#0d0d2b" }}>
                  <img
                    src={article.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0d0d2b 0%, transparent 60%)" }} />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-purple-600 text-white font-orbitron text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-purple-600/40">
                    {article.category || "Update"}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center gap-1.5 font-rajdhani text-gray-500 text-xs font-semibold">
                      <FaCalendarAlt className="text-purple-500" size={10} />
                      {article.date ? new Date(article.date).toLocaleDateString() : "Recent"}
                    </span>
                    <span className="flex items-center gap-1.5 font-rajdhani text-gray-500 text-xs font-semibold">
                      <FaClock className="text-purple-500" size={10} />
                      {article.readTime || "3 min"}
                    </span>
                  </div>

                  <h3 className="font-orbitron text-sm font-black uppercase tracking-tight text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="font-rajdhani text-gray-500 text-sm leading-relaxed line-clamp-3 mb-5">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-purple-900/20">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-purple-600/20 border border-purple-600/30 rounded-full flex items-center justify-center text-purple-400">
                        <FaUser size={10} />
                      </div>
                      <span className="font-rajdhani text-gray-400 text-xs font-semibold">Admin</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-rajdhani text-gray-600 text-xs font-semibold">
                      <FaEye size={10} />
                      {article.views || "1.2K"}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default News;
