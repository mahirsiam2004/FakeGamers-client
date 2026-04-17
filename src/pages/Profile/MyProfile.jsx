import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaUser, FaEdit, FaSave, FaTimes, FaGamepad, FaDownload, FaTrophy, FaCalendar } from "react-icons/fa";

const MyProfile = () => {
  const { user, loading, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [newPhoto, setNewPhoto] = useState(null);

  const handleUpdateProfile = async () => {
    try {
      let photoURL = user?.photoURL;
      if (newPhoto) {
        photoURL = URL.createObjectURL(newPhoto);
        toast.success("Photo updated! (Demo)");
      }
      await updateUserProfile(newName, photoURL);
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#07071a]">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { label: "Games Played",  value: "1,337", icon: <FaGamepad />,  color: "text-purple-400" },
    { label: "Games Uploaded", value: "42",   icon: <FaDownload />, color: "text-green-400" },
    { label: "World Rank",    value: "#69",   icon: <FaTrophy />,   color: "text-yellow-400" },
    { label: "Member Since",  value: "2025",  icon: <FaCalendar />, color: "text-blue-400" },
  ];

  return (
    <div className="min-h-screen bg-[#07071a] py-16 px-6">
      {/* bg glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/8 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-purple-600/10 border border-purple-600/20 px-4 py-1.5 rounded-full text-purple-400 text-[11px] font-black uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
            Gamer Profile
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
            My <span className="text-purple-400">Profile</span>
          </h1>
          <p className="text-gray-500 mt-2">Level 99 Gamer • Elite Member</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0d0d2b] border border-purple-900/20 rounded-[28px] p-8 text-center"
          >
            <div className="relative inline-block mb-5">
              <div className="absolute -inset-2 bg-purple-600/20 blur-xl rounded-full" />
              <img
                src={user?.photoURL || "https://i.ibb.co/7p0dK9D/avatar-placeholder.png"}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-purple-600/40 object-cover relative z-10"
              />
              <div className="absolute bottom-1 right-1 bg-green-500 text-white px-2 py-0.5 rounded-full font-black text-[10px] uppercase z-20">
                Online
              </div>
            </div>
            <h2 className="text-xl font-black text-white mb-1">{user?.displayName || "Pro Gamer"}</h2>
            <p className="text-gray-500 text-xs break-all mb-6">{user?.email}</p>

            <div className="space-y-2">
              {[
                { label: "1,337 Games Played", bg: "bg-purple-600/20 border border-purple-600/30 text-purple-300" },
                { label: "42 Games Uploaded",  bg: "bg-green-900/20 border border-green-800/30 text-green-400" },
                { label: "Rank #69 Worldwide", bg: "bg-yellow-900/20 border border-yellow-800/30 text-yellow-400" },
              ].map((item) => (
                <div key={item.label} className={`${item.bg} py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest`}>
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Edit Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-[#0d0d2b] border border-purple-900/20 rounded-[28px] p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Edit Profile</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                  isEditing
                    ? "bg-red-900/20 border border-red-800/30 text-red-400 hover:bg-red-900/40"
                    : "purple-btn text-white"
                }`}
              >
                {isEditing ? <><FaTimes /> Cancel</> : <><FaEdit /> Edit</>}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Display Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-purple-900/10 border border-purple-800/30 focus:border-purple-600/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
                    placeholder="xXProGamerXx"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Change Avatar</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewPhoto(e.target.files[0])}
                    className="w-full bg-purple-900/10 border border-purple-800/30 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-purple-600/30 file:text-white file:text-xs file:font-bold file:cursor-pointer"
                  />
                </div>
                <button
                  onClick={handleUpdateProfile}
                  className="w-full purple-btn text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <FaSave /> Save Changes
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  ["Member Since", "January 2025"],
                  ["Total Downloads", "89,421"],
                  ["Games Uploaded", "42"],
                  ["Status", "VERIFIED CREATOR"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center py-3 border-b border-purple-900/20 last:border-0">
                    <span className="text-gray-500 text-sm font-bold">{k}</span>
                    {k === "Status" ? (
                      <span className="bg-purple-600/20 border border-purple-600/30 text-purple-300 px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest">
                        {v}
                      </span>
                    ) : (
                      <span className="text-purple-400 font-black text-sm">{v}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mt-8">
              <button className="bg-purple-900/20 hover:bg-purple-900/40 border border-purple-800/30 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                My Games
              </button>
              <button className="purple-btn text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest">
                My Downloads
              </button>
            </div>
          </motion.div>
        </div>

        {/* Welcome message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-2xl font-black text-white">
            Welcome back,{" "}
            <span className="text-purple-400">{user?.displayName || "Legend"}</span>
          </p>
          <p className="text-gray-500 mt-2">Keep dominating. The world is watching.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;
