import React from "react";
import { Link } from "react-router";
import Login from "../pages/Login/Login";
import Button from "./Buttons/LoginButton";

const Navbar = () => {
  const links = (
    <>
      <Link to={"/games"}>Games</Link>
      <Link to={"/news"}>News</Link>
      <Link to={"/store"}>Store</Link>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm mono">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost fancy text-2xl">
            <h2 className="text-4xl font-extrabold fancy text-black">
              FAKE<span className="text-red-500">GAMERS</span>
            </h2>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-3">{links}</ul>
        </div>
        <div className="navbar-end">
          <Link to={"/login"} className="">
            <Button txt="Login"></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
