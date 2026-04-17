import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";

import photo1 from "../assets/banner/1.webp";
import photo2 from "../assets/banner/2.webp";
import photo3 from "../assets/banner/3.webp";
import photo4 from "../assets/banner/4.webp";
import photo10 from "../assets/banner/10.webp";
import photo11 from "../assets/banner/11.webp";
import girlWithStick from "../assets/banner/girl-with-stick.webp";

const slides = [
  { image: photo1,       title: "GALACTIC",  sub: "ODYSSEY",   desc: "Experience the ultimate space combat. Dominate galaxies, build fleets, and conquer the universe in this epic multiplayer saga.", price: "9.99",  genre: "Space • Action" },
  { image: photo2,       title: "SILENT",    sub: "WRATH",     desc: "Infiltrate enemy bases, eliminate targets, and disappear into the shadows. The ultimate stealth experience awaits.", price: "14.99", genre: "Stealth • Thriller" },
  { image: photo3,       title: "BETA",      sub: "PROTOCOL",  desc: "Be the first to experience our next-gen title. Exclusive early access with full server hosting included.", price: "7.99",  genre: "Sci-Fi • RPG" },
  { image: photo4,       title: "ARENA",     sub: "DOMINATOR", desc: "Unleash your skills and rise to the top of the leaderboards. Compete in daily tournaments for glory and prizes.", price: "12.99", genre: "Battle Royale" },
  { image: photo10,      title: "LEGENDARY", sub: "LOOT",      desc: "Discover rare items and power up your character. Thousands of unique items await in this massive open-world adventure.", price: "19.99", genre: "RPG • Fantasy" },
  { image: photo11,      title: "NEXT-GEN",  sub: "WARS",      desc: "Experience graphics and gameplay like never before. The future of gaming is here with cutting-edge server infrastructure.", price: "24.99", genre: "FPS • Multiplayer" },
  { image: girlWithStick, title: "SHADOW",   sub: "STRIKE",    desc: "Master the ancient arts of combat. Wield legendary weapons and defeat enemies across stunning mythological worlds.", price: "11.99", genre: "Action • Fantasy" },
];

const Banner = () => {
  const [current, setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);
  const bgRef = useRef(null);

  /* Parallax on mouse move */
  useEffect(() => {
    const handleMouse = (e) => {
      if (!bgRef.current) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      bgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.08)`;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const next = useCallback(() => { setDirection(1);  setCurrent((c) => (c + 1) % slides.length); }, []);
  const prev = useCallback(() => { setDirection(-1); setCurrent((c) => (c - 1 + slides.length) % slides.length); }, []);

  useEffect(() => {
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  const bgVariants = {
    enter:  (d) => ({ x: d > 0 ? "8%"  : "-8%",  opacity: 0, scale: 1.1 }),
    center: {       x: 0,                          opacity: 1, scale: 1.05 },
    exit:   (d) => ({ x: d > 0 ? "-8%" : "8%",   opacity: 0, scale: 1 }),
  };

  const textVariants = {
    enter:  { opacity: 0, y: 40 },
    center: { opacity: 1, y: 0 },
    exit:   { opacity: 0, y: -20 },
  };

  return (
    <div className="relative w-full overflow-hidden hero-grid" style={{ minHeight: "92vh" }}>

      {/* ── Parallax Background ── */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={current}
            custom={direction}
            variants={bgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <div
              ref={bgRef}
              className="absolute inset-[-10%] transition-transform duration-100 ease-out"
              style={{ willChange: "transform" }}
            >
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07071a]/98 via-[#07071a]/75 to-[#07071a]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07071a] via-transparent to-transparent" />
        {/* Scanline effect */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(108,59,255,0.5) 2px, rgba(108,59,255,0.5) 4px)", backgroundSize: "100% 4px" }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col justify-center min-h-[92vh] py-24">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-2xl text-left"
          >
            {/* Status badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full blink" />
              <span className="font-orbitron text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Servers Are Available
              </span>
            </div>

            {/* Title */}
            <h1 className="font-orbitron font-black uppercase leading-none mb-2">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight">
                {slide.title}
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-purple-400 tracking-tight">
                {slide.sub}
              </span>
            </h1>

            {/* Genre */}
            <div className="flex items-center gap-3 my-5">
              <span className="font-mono-tech text-[11px] text-purple-400 uppercase tracking-widest">{slide.genre}</span>
              <span className="w-1 h-1 bg-purple-600 rounded-full" />
              <span className="font-mono-tech text-[11px] text-gray-500 uppercase tracking-widest">Multiplayer</span>
            </div>

            {/* Description */}
            <p className="font-rajdhani text-gray-300 text-lg leading-relaxed mb-8 max-w-xl font-medium text-left">
              {slide.desc}
            </p>

            {/* Price */}
            <div className="mb-8">
              <p className="font-orbitron text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-2">Starting at</p>
              <div className="flex items-baseline gap-1">
                <span className="font-orbitron text-gray-400 text-2xl font-bold">$</span>
                <span className="font-orbitron text-6xl md:text-7xl font-black text-white leading-none">{slide.price}</span>
                <span className="font-orbitron text-purple-400 text-lg font-bold">/monthly</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/games"
              className="inline-block purple-btn font-orbitron text-white font-bold px-10 py-4 rounded-xl uppercase tracking-widest text-[11px]"
            >
              Order Your Game Server Now
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Slide Number ── */}
      <div className="absolute bottom-10 right-10 z-20">
        <span className="font-orbitron text-7xl font-black text-white/8 select-none leading-none">
          {String(current + 1).padStart(2, "0")}
        </span>
      </div>

      {/* ── Controls ── */}
      <div className="absolute bottom-10 right-28 z-20 flex gap-2">
        <button onClick={prev}
          className="w-11 h-11 bg-white/5 hover:bg-purple-600/40 border border-white/10 hover:border-purple-500/50 rounded-xl flex items-center justify-center text-white transition-all backdrop-blur-sm">
          <FaChevronLeft size={14} />
        </button>
        <button onClick={next}
          className="w-11 h-11 bg-purple-600/30 hover:bg-purple-600/60 border border-purple-500/40 rounded-xl flex items-center justify-center text-white transition-all backdrop-blur-sm">
          <FaChevronRight size={14} />
        </button>
      </div>

      {/* ── Dots ── */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`transition-all duration-300 rounded-full ${i === current ? "w-8 h-2 bg-purple-500" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
          />
        ))}
      </div>

      {/* ── Side slide list ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-3">
        {slides.map((s, i) => (
          <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`flex items-center gap-2 transition-all duration-300 group ${i === current ? "opacity-100" : "opacity-30 hover:opacity-60"}`}>
            <div className={`w-1 h-8 rounded-full transition-all ${i === current ? "bg-purple-500" : "bg-white/20"}`} />
            <span className="font-orbitron text-[9px] text-white uppercase tracking-widest hidden group-hover:block">
              {s.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
