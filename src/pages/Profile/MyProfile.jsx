import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

const MyProfile = () => {
  const { user, loading, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [newPhoto, setNewPhoto] = useState(null);

  const handleUpdateProfile = async () => {
    try {
      let photoURL = user?.photoURL;

      if (newPhoto) {
        photoURL = URL.createObjectURL(newPhoto); // Demo mode
        toast.success("Photo updated! (Demo)");
      }

      await updateUserProfile(newName, photoURL);
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-8 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br mono from-gray-100 via-white to-red-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-5xl md:text-6xl fancy font-black text-black">
            MY <span className="text-red-600">PROFILE</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-bold">
            Level 99 Gamer • Elite Member
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Card */}
          <div className="lg:col-span-1 bg-white rounded-3xl shadow-2xl border-4 border-black p-6 text-center space-y-4">
            <div className="relative inline-block">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/7p0dK9D/avatar-placeholder.png"
                }
                alt="Avatar"
                className="w-40 h-40 rounded-full border-4 border-red-600 object-cover mx-auto"
              />
              <div className="absolute bottom-0 right-0 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-xs">
                ONLINE
              </div>
            </div>
            <h2 className="text-2xl font-black">
              {user?.displayName || "Pro Gamer"}
            </h2>
            <p className="text-gray-500 text-sm break-all">{user?.email}</p>

            <div className="space-y-2 mt-4">
              <div className="bg-red-600 text-white py-2 rounded-lg font-bold text-sm">
                1,337 Games Played
              </div>
              <div className="bg-black text-white py-2 rounded-lg font-bold text-sm">
                42 Games Uploaded
              </div>
              <div className="bg-gray-200 text-black py-2 rounded-lg font-bold text-sm">
                Rank #69 Worldwide
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl border-4 border-black p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black">EDIT PROFILE</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-black mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-black rounded-lg focus:border-red-600 outline-none"
                    placeholder="xXProGamerXx"
                  />
                </div>
                <div>
                  <label className="block font-bold text-black mb-1">
                    Change Avatar
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewPhoto(e.target.files[0])}
                    className="w-full file:rounded-lg file:bg-red-600 file:text-white file:px-4 file:py-2 cursor-pointer"
                  />
                </div>
                <button
                  onClick={handleUpdateProfile}
                  className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl font-black text-lg uppercase tracking-widest"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1 border-b border-gray-300">
                  <span className="font-bold">Member Since</span>
                  <span className="text-red-600 font-bold">January 2025</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-300">
                  <span className="font-bold">Total Downloads</span>
                  <span className="text-red-600 font-bold">89,421</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-300">
                  <span className="font-bold">Games Uploaded</span>
                  <span className="text-red-600 font-bold">42</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-bold">Status</span>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full font-bold text-xs">
                    VERIFIED CREATOR
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button className="bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-900 transition">
                My Games
              </button>
              <button className="bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition">
                My Downloads
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-2xl font-black">
            Welcome back,{" "}
            <span className="text-red-600">
              {user?.displayName || "Legend"}
            </span>
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Keep dominating. The world is watching.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
