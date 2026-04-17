import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { Atom } from "react-loading-indicators";
import { Link, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",      to: "/",          num: "1" },
  { label: "Games",     to: "/games",     num: "2" },
  { label: "News",      to: "/news",      num: "3" },
  { label: "Store",     to: "/store",     num: "4" },
];

const Navbar = () => {
  const { user, loading, logOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen]  = useState(false);
  const [scrolled, setScrolled]      = useState(false);

  const avatarRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) setAvatarOpen(false);
      if (mobileRef.current && !mobileRef.current.contains(e.target)) setMobileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogOut = async () => {
    try { await logOut(); setAvatarOpen(false); }
    catch (err) { console.error(err); }
  };

  /* avatar src with fallback */
  const avatarSrc = user?.photoURL || null;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#07071a]/95 backdrop-blur-xl border-b border-purple-900/30 shadow-[0_4px_30px_rgba(108,59,255,0.12)]"
          : "bg-[#07071a]/80 backdrop-blur-md border-b border-purple-900/20"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo: text only ── */}
          <Link to="/" className="group">
            <span className="font-orbitron text-xl font-black tracking-widest uppercase text-white group-hover:text-purple-300 transition-colors">
              FAKE<span className="text-purple-400">GAMERS</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative flex items-center gap-1 px-4 py-2 rounded-lg font-rajdhani font-semibold text-sm tracking-wide transition-all duration-200 group ${
                    isActive
                      ? "text-white bg-purple-600/15"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`font-mono-tech text-[10px] ${isActive ? "text-purple-400" : "text-gray-600 group-hover:text-purple-500"} transition-colors`}>
                      {link.num}
                    </span>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `relative flex items-center gap-1 px-4 py-2 rounded-lg font-rajdhani font-semibold text-sm tracking-wide transition-all duration-200 ${
                    isActive ? "text-white bg-purple-600/15" : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <span className="font-mono-tech text-[10px] text-gray-600">5</span>
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* ── Right ── */}
          <div className="flex items-center gap-3">
            {/* Availability badge */}
            <div className="hidden md:flex items-center gap-2 bg-purple-900/25 border border-purple-800/30 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full blink" />
              <span className="font-orbitron text-[9px] font-bold text-gray-300 uppercase tracking-widest">Servers Online</span>
            </div>

            {loading ? (
              <Atom color="#6c3bff" size="small" />
            ) : user ? (
              <div className="relative" ref={avatarRef}>
                <button
                  onClick={() => setAvatarOpen((s) => !s)}
                  className="flex items-center gap-2 bg-purple-900/25 hover:bg-purple-900/40 px-3 py-2 rounded-xl border border-purple-800/30 transition-all"
                >
                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
                      alt="avatar"
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-purple-500/50"
                    />
                  ) : null}
                  <FaUserCircle
                    className="w-7 h-7 text-purple-400"
                    style={{ display: avatarSrc ? "none" : "block" }}
                  />
                  <span className="hidden md:block font-rajdhani font-bold text-sm text-white max-w-[100px] truncate">
                    {user?.displayName || user?.email?.split("@")[0]}
                  </span>
                </button>

                <AnimatePresence>
                  {avatarOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 bg-[#0d0d2b] border border-purple-800/40 rounded-2xl shadow-2xl shadow-purple-900/40 py-2 overflow-hidden"
                    >
                      <li className="px-4 py-2 border-b border-purple-900/30">
                        <p className="font-orbitron text-[10px] text-gray-500 uppercase tracking-widest">Signed in as</p>
                        <p className="font-rajdhani font-bold text-white text-sm truncate">{user?.displayName || user?.email}</p>
                      </li>
                      <li>
                        <Link to="/profile" className="block px-4 py-3 hover:bg-purple-600/10 transition-colors font-rajdhani font-semibold text-white text-sm" onClick={() => setAvatarOpen(false)}>
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/dashboard" className="block px-4 py-3 hover:bg-purple-600/10 transition-colors font-rajdhani font-semibold text-white text-sm" onClick={() => setAvatarOpen(false)}>
                          Dashboard
                        </Link>
                      </li>
                      <li className="border-t border-purple-900/30">
                        <button onClick={handleLogOut} className="w-full text-left px-4 py-3 hover:bg-purple-600/10 text-purple-400 transition-colors font-rajdhani font-bold text-sm">
                          Logout
                        </button>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="purple-btn font-orbitron text-white font-bold px-6 py-2.5 rounded-xl uppercase tracking-widest text-[11px]"
              >
                Get Hosting
              </Link>
            )}

            {/* Hamburger */}
            <button className="lg:hidden p-2 text-white" onClick={() => setMobileOpen((s) => !s)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              ref={mobileRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="bg-[#0d0d2b] border border-purple-900/30 rounded-2xl p-4 mb-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-3 rounded-xl font-rajdhani font-semibold text-sm transition-all ${
                        isActive ? "bg-purple-600/20 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`
                    }
                  >
                    <span className="font-mono-tech text-[10px] text-purple-500">{link.num}</span>
                    {link.label}
                  </NavLink>
                ))}
                {user && (
                  <NavLink to="/dashboard" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl font-rajdhani font-semibold text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                    <span className="font-mono-tech text-[10px] text-purple-500">5</span>
                    Dashboard
                  </NavLink>
                )}
                <div className="border-t border-purple-900/30 pt-3 mt-3">
                  {user ? (
                    <button onClick={() => { handleLogOut(); setMobileOpen(false); }}
                      className="w-full text-left px-4 py-3 text-purple-400 font-rajdhani font-bold text-sm">
                      Logout
                    </button>
                  ) : (
                    <Link to="/login" onClick={() => setMobileOpen(false)}
                      className="block w-full text-center purple-btn font-orbitron text-white font-bold px-6 py-3 rounded-xl uppercase tracking-widest text-[11px]">
                      Get Hosting
                    </Link>
                  )}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
