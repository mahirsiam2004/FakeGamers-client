import React, { useState, useRef, useEffect } from "react";

import Button from "./Buttons/LoginButton";
import Logo from "./logo/Logo";
import useAuth from "../hooks/useAuth";
import { Atom } from "react-loading-indicators"; // keep if installed
import { Link } from "react-router";

const Navbar = () => {
  const { user, setUser, loading, logOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const avatarRef = useRef(null);
  const mobileRef = useRef(null);

  const handleLogOut = async () => {
    try {
      await logOut();
      setAvatarOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };


  useEffect(() => {
    const handler = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {

        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const links = (
    <>
      <Link className="px-3 py-2 hover:text-red-600" to={"/games"}>
        Games
      </Link>
      <Link className="px-3 py-2 hover:text-red-600" to={"/news"}>
        News
      </Link>
      <Link className="px-3 py-2 hover:text-red-600" to={"/store"}>
        Store
      </Link>
      {user && (
        <Link className="px-3 py-2 hover:text-red-600" to={"/dashboard"}>
          Dashboard
        </Link>
      )}
    </>
  );

  return (
    <header className="bg-base-100 shadow-sm mono sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
     
          <div className="flex items-center gap-3">
  
            <button
              className="lg:hidden btn btn-ghost p-2"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
              ref={mobileRef}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    mobileOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            <Link to={"/"} className="btn btn-ghost fancy text-2xl p-0">
              <Logo />
            </Link>
          </div>

     
          <nav className="hidden lg:flex lg:items-center lg:gap-2">{links}</nav>

       
          <div className="flex items-center gap-3">
            {loading ? (
              <Atom
                color="#f10808"
                size="small"
                text=""
                textColor="#NaNNaNNaN"
              />
            ) : user ? (
              <div className="relative" ref={avatarRef}>
                <button
                  onClick={() => setAvatarOpen((s) => !s)}
                  className="flex items-center gap-2 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={avatarOpen}
                >
                  <img
                    src={user.photoURL || ""}
                    alt={user.displayName || "avatar"}
                    className="rounded-full h-10 w-10 object-cover border"
                    onError={(e) => {
                
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%23e5e7eb' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='50%25' dy='.35em' text-anchor='middle' font-size='14' fill='%23777'%3E%3F%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <h2 className=" hidden md:block">{user?.displayName}</h2>
                </button>

                {/* avatar dropdown */}
                {avatarOpen && (
                  <ul className="absolute -right-10 mt-2 w-40 bg-base-100 rounded-md shadow-lg py-1 text-sm">
                    <li>
                      <Link
                        to={"/profile"}
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setAvatarOpen(false)}
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="w-full  px-4 py-2 hover:bg-gray-100"
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link to={"/login"}>
                <Button txt="Login" />
              </Link>
            )}
          </div>
        </div>

        {/* mobile menu — shows only on small screens */}
        {mobileOpen && (
          <nav className="lg:hidden mt-2 mb-3">
            <div className="flex flex-col gap-1 bg-base-100 rounded-md p-2 shadow-sm">
              {links}
              <div className="border-t pt-2 mt-2">
                {user ? (
                  <>
                    <div className="px-3 py-2">Signed in as</div>
                    <div className="px-3 py-1 font-semibold">
                      {user.displayName || user.email}
                    </div>
                    <button
                      onClick={() => {
                        handleLogOut();
                        setMobileOpen(false);
                      }}
                      className="btn btn-ghost w-full text-left mt-2"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <Link
                    to={"/login"}
                    className="btn btn-neutral w-full text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
