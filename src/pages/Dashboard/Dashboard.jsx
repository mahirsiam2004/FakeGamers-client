import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaGamepad,
  FaDownload,
  FaPlus,
  FaNewspaper,
  FaUsers,
  FaHome,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { name: "My Games",     path: "/dashboard/myGames",     icon: <FaGamepad /> },
    { name: "My Downloads", path: "/dashboard/myDownloads", icon: <FaDownload /> },
    { name: "Add Game",     path: "/dashboard/addGames",    icon: <FaPlus /> },
  ];

  const adminLinks = [
    { name: "Manage News",  path: "/dashboard/manageNews",  icon: <FaNewspaper /> },
    { name: "All Games",    path: "/dashboard/allGames",    icon: <FaGamepad /> },
    { name: "Manage Users", path: "/dashboard/manageUsers", icon: <FaUsers /> },
  ];

  const Sidebar = () => (
    <div className="w-64 bg-[#0d0d2b] border-r border-purple-900/20 text-white flex flex-col h-full">
      {/* Brand */}
      <div className="p-6 border-b border-purple-900/20">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          fake<span className="text-purple-400">gamers</span>
        </h2>
        <p className="text-[11px] text-gray-600 uppercase tracking-widest mt-1 font-bold">Control Panel</p>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-purple-900/20">
        <div className="flex items-center gap-3 bg-purple-900/20 rounded-xl p-3">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="avatar" className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-600/40" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400">
              <FaUser size={14} />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">{user?.displayName || "Gamer"}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              {isAdmin ? "Admin" : "Member"}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-3 mb-3">Main Menu</p>
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${
                isActive
                  ? "bg-purple-600/20 text-white border border-purple-600/30 shadow-lg shadow-purple-900/20"
                  : "text-gray-500 hover:bg-purple-900/20 hover:text-white"
              }`
            }
          >
            <span className="text-purple-400">{link.icon}</span>
            {link.name}
          </NavLink>
        ))}

        {isAdmin && (
          <>
            <div className="pt-6 pb-3">
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-3">Admin Settings</p>
            </div>
            {adminLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${
                    isActive
                      ? "bg-purple-600/20 text-white border border-purple-600/30"
                      : "text-gray-500 hover:bg-purple-900/20 hover:text-white"
                  }`
                }
              >
                <span className="text-purple-400">{link.icon}</span>
                {link.name}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      {/* Back to home */}
      <div className="p-4 border-t border-purple-900/20">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-white hover:bg-purple-900/20 rounded-xl transition-all text-sm font-semibold"
        >
          <FaHome className="text-purple-400" />
          Back to Home
        </NavLink>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#07071a]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-64 fixed left-0 top-0 h-screen z-40">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 flex flex-col h-full">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-[#0d0d2b]/80 backdrop-blur-xl border-b border-purple-900/20 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaBars />
            </button>
            <h1 className="text-lg font-black text-white uppercase tracking-tight">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">{user?.displayName || "Gamer"}</p>
              <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">
                {isAdmin ? "Super Admin" : "Member"}
              </p>
            </div>
            {user?.photoURL ? (
              <img src={user.photoURL} alt="avatar" className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-600/40" />
            ) : (
              <div className="w-9 h-9 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400">
                <FaUser size={14} />
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
