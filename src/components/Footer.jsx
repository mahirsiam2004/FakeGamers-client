import React from "react";
import { FaDiscord, FaTwitter, FaInstagram, FaYoutube, FaTwitch, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#07071a] pt-20 pb-10 border-t border-purple-900/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <span className="font-orbitron text-xl font-black tracking-widest uppercase text-white hover:text-purple-300 transition-colors">
                FAKE<span className="text-purple-400">GAMERS</span>
              </span>
            </Link>
            <p className="font-rajdhani text-gray-500 text-base leading-relaxed max-w-xs">
              Empowering gamers worldwide with high-performance, low-latency server hosting solutions. Build your community today.
            </p>
            <div className="flex gap-3">
              {[FaDiscord, FaTwitter, FaInstagram, FaYoutube, FaTwitch].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 bg-purple-900/20 border border-purple-800/30 hover:bg-purple-600/30 hover:border-purple-600/50 rounded-xl flex items-center justify-center text-gray-500 hover:text-white transition-all duration-300">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Game Server */}
          <div>
            <h4 className="font-orbitron text-white font-bold uppercase tracking-widest text-[10px] mb-7">Game Server</h4>
            <ul className="space-y-3 text-gray-500 font-rajdhani font-semibold text-base">
              {["Thunder and City", "Mystic Racing Z", "Silent Wrath", "Funk Dungeon", "Galactic Odyssey", "Warfare Legend"].map(l => (
                <li key={l}>
                  <a href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-purple-800 group-hover:bg-purple-400 rounded-full transition-colors" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-orbitron text-white font-bold uppercase tracking-widest text-[10px] mb-7">Pages</h4>
            <ul className="space-y-3 text-gray-500 font-rajdhani font-semibold text-base">
              {[["Game Server", "#"], ["Knowledgebase", "#"], ["About Us", "#"], ["Affiliates", "#"], ["Locations", "#"], ["News", "/news"]].map(([l, to]) => (
                <li key={l}>
                  <Link to={to} className="hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-purple-800 group-hover:bg-purple-400 rounded-full transition-colors" />
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-orbitron text-white font-bold uppercase tracking-widest text-[10px] mb-7">Newsletter</h4>
            <p className="font-rajdhani text-gray-500 text-base mb-5 leading-relaxed">
              Your email is safe with us. We don't spam.
            </p>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="enter your email"
                className="input-dark flex-1 text-sm"
              />
              <button className="purple-btn text-white p-3 rounded-xl transition-all flex-shrink-0">
                <FaArrowRight />
              </button>
            </div>
            <div>
              <p className="font-orbitron text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Follow Us on</p>
              <div className="flex gap-3">
                {[FaDiscord, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                  <a key={i} href="#"
                    className="w-8 h-8 bg-purple-900/20 border border-purple-800/30 hover:bg-purple-600/30 rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-all">
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-purple-900/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-rajdhani text-gray-600 text-sm font-semibold">
            Copyright 2025 – FAKEGAMERS by{" "}
            <span className="text-purple-400">Innovatrix</span>
          </p>
          <div className="flex gap-6 font-orbitron text-[9px] font-bold uppercase tracking-widest text-gray-600">
            {["Terms & Conditions", "Privacy Policy", "Status"].map(l => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
