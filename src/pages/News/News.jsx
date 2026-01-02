import React from "react";
import { motion } from "framer-motion";
import {
  FaNewspaper,
  FaCalendarAlt,
  FaClock,
  FaFire,
  FaGamepad,
  FaTag,
  FaUser,
  FaEye,
} from "react-icons/fa";

const newsArticles = [
  {
    id: 1,
    title: "Season 3 Battle Pass Now Live – New Skins & Rewards!",
    excerpt:
      "Unlock 100+ exclusive items, legendary operator skins, and the new Mythic weapon blueprint.",
    category: "Update",
    date: "2025-12-08",
    readTime: "3 min",
    views: "12.4K",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
  },
  {
    id: 2,
    title: "Ranked Play Overhaul Coming Next Week",
    excerpt:
      "Major changes to skill-based matchmaking, new divisions, and exclusive ranked rewards.",
    category: "Patch Notes",
    date: "2025-12-07",
    readTime: "5 min",
    views: "9.8K",
    featured: false,
  },
  {
    id: 3,
    title: "Holiday Event: Winter Warfare Starts Dec 20",
    excerpt:
      "Snow-covered maps, festive weapon charms, double XP weekends, and limited-time modes.",
    category: "Event",
    date: "2025-12-06",
    readTime: "2 min",
    views: "18.2K",
    featured: true,
  },
  {
    id: 4,
    title: "Developer Diary: The Future of Cross-Platform Play",
    excerpt:
      "Our team shares insights on upcoming cross-save, unified progression, and console-to-PC migration.",
    category: "Behind the Scenes",
    date: "2025-12-04",
    readTime: "7 min",
    views: "6.1K",
    featured: false,
  },
];

const News = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-red-50 via-white to-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative max-w-7xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-3 text-red-600 text-sm font-bold uppercase tracking-wider mb-6"
          >
            <FaFire className="text-2xl" />
            Latest News & Updates
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-red-600">
            NEWS HUB
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Stay up to date with patches, events, esports, and everything
            happening in the game.
          </p>
        </motion.div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-red-600 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl"
            >
              {/* Featured Badge */}
              {article.featured && (
                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <FaFire /> Hot
                </div>
              )}

              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <FaTag className="text-red-500" /> {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt />{" "}
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock /> {article.readTime}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition">
                  {article.title}
                </h2>

                <p className="mt-3 text-gray-600 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <FaEye /> {article.views} views
                  </span>
                  <motion.span
                    whileHover={{ x: 5 }}
                    className="text-red-600 font-semibold flex items-center gap-2"
                  >
                    Read More →
                  </motion.span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Placeholder */}
        <div className="text-center mt-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl shadow-xl transition"
          >
            Load More News
          </motion.button>
        </div>
      </section>

      {/* Background Grid (optional global CSS) */}
      <style jsx>{`
        .bg-grid {
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default News;
