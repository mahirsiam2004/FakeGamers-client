import React from "react";
import { motion } from "framer-motion"; 

const Footer = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
        delayChildren: 0.3,
      },
    },
  };

  const columnItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
 
    <footer className="bg-black border-t-2 border-red-600 mt-20">
      <motion.div
        className="max-w-7xl mx-auto px-6 py-12 lg:py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mono">
         
          <motion.div
            className="col-span-2 md:col-span-1"
            variants={columnItemVariants}
          >
         
            <h2 className="text-4xl font-extrabold fancy text-white">
              FAKE<span className="text-red-500">GAMERS</span>
            </h2>
            <p className="text-gray-400 text-sm mt-4 max-w-xs">
              The ultimate cross-game universe. Download, upload, and trade
              digital games & in-game items.
            </p>
            {/* Replaced cyan-400 with red-500 for copyright */}
            <p className="text-red-500 text-xs mt-6">
              © 2025 FAKEGAMERS. All rights reserved.
            </p>
          </motion.div>

          {/* Quick Links (Animated) */}
          <motion.div variants={columnItemVariants}>
            <h3 className="text-white font-bold mb-4">Platform</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <motion.li whileHover={{ x: 5 }}>
                {" "}
                {/* Framer Motion hover effect */}
                <a href="/games" className="hover:text-blue-500 transition">
                  Browse Games
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a
                  href="/top-downloads"
                  className="hover:text-blue-500 transition"
                >
                  Top Downloads
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/upload" className="hover:text-blue-500 transition">
                  Upload Game
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/store" className="hover:text-blue-500 transition">
                  Store
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Community (Animated) */}
          <motion.div variants={columnItemVariants}>
            <h3 className="text-white font-bold mb-4">Community</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <motion.li whileHover={{ x: 5 }}>
                <a href="/news" className="hover:text-blue-500 transition">
                  News & Updates
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a
                  href="/leaderboard"
                  className="hover:text-blue-500 transition"
                >
                  Leaderboard
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/discord" className="hover:text-blue-500 transition">
                  Discord
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/forums" className="hover:text-blue-500 transition">
                  Forums
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Support (Animated) */}
          <motion.div variants={columnItemVariants}>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <motion.li whileHover={{ x: 5 }}>
                <a href="/help" className="hover:text-blue-500 transition">
                  Help Center
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/contact" className="hover:text-blue-500 transition">
                  Contact Us
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/terms" className="hover:text-blue-500 transition">
                  Terms of Service
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/privacy" className="hover:text-blue-500 transition">
                  Privacy Policy
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Social + Newsletter (Animated) */}
          <motion.div
            className="col-span-2 md:col-span-1"
            variants={columnItemVariants}
          >
            <h3 className="text-white font-bold mb-4">Stay Cosmic</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get exclusive drops & updates
            </p>

            <div className="flex gap-4 mb-6 text-white">
              <motion.a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255, 0, 0, 0.5)",
                }} 
                transition={{ duration: 0.2 }}
              >
                <span className="text-xl">D</span>
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(0, 0, 255, 0.5)",
                }} 
                transition={{ duration: 0.2 }}
              >
                <span className="text-xl">T</span>
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255, 0, 0, 0.5)",
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xl">I</span>
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(0, 0, 255, 0.5)",
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xl">Y</span>
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255, 0, 0, 0.5)",
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xl">t</span>
              </motion.a>
            </div>

          </motion.div>
        </div>

    
        <motion.div
          className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p>
            FakeGamers is not affiliated with Steam, Epic Games, Valve, or any
            game publisher. This is an independent community platform.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
