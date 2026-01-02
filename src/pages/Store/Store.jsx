import React from "react";
import { motion } from "framer-motion";
import {
  FaGamepad,
  FaFire,
  FaShoppingCart,
  FaClock,
  FaSearch,
} from "react-icons/fa";

const Store = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
   
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-red-100 py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
            className="inline-flex items-center gap-3 text-red-600 text-sm font-bold uppercase tracking-wider mb-6"
          >
            <FaFire className="text-2xl animate-pulse" />
            Premium Game Marketplace
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-red-600">
            GAME STORE
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover hand-picked, high-quality games from top indie developers
            and studios. Instant delivery • Secure payments • Lifetime access.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <div className="relative group">
              <input
                type="text"
                placeholder="Search games..."
                className="w-full sm:w-96 px-6 py-5 pr-14 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 transition text-lg shadow-sm"
              />
              <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition" />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl shadow-xl flex items-center gap-3 transition"
            >
              <FaShoppingCart />
              Browse All Games
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

     
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaGamepad className="text-5xl text-red-600" />,
              title: "Curated Collection",
              desc: "Only the best indie and AAA titles make it to our store.",
            },
            {
              icon: <FaClock className="text-5xl text-red-600" />,
              title: "Launching Soon",
              desc: "Full store with filters, categories, wishlist, and cart system.",
            },
            {
              icon: <FaFire className="text-5xl text-red-600" />,
              title: "Exclusive Drops",
              desc: "Limited editions, early access, and developer bundles incoming.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-white border border-gray-200 rounded-2xl p-10 text-center hover:border-red-600 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-5 rounded-2xl transition"></div>

              <div className="relative z-10">
                <div className="mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

     
      <section className="bg-gradient-to-t from-red-50 to-transparent py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center max-w-4xl mx-auto px-6"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
            The Store is <span className="text-red-600">Coming Soon</span>
          </h2>
          <p className="text-xl text-gray-600">
            Get ready for the ultimate gaming marketplace experience.
          </p>
        </motion.div>
      </section>

     
      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.05) 1px,
              transparent 1px
            );
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default Store;
