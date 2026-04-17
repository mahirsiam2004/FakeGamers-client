import React from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { imageUpload } from "../../utils/upload";
import { motion } from "framer-motion";
import { FaGamepad, FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { Store } from "react-notifications-component";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const handleRegister = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);
      await createUser(email, password);
      await updateUserProfile(name, imageURL);

      const userData = { name, email, image: imageURL };
      await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);

      toast.success("Account registered successfully!");

      Store.addNotification({
        title: "You unlocked Dashboard!",
        message: "Welcome gamer!",
        type: "info",
        container: "bottom-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: { duration: 5000, onScreen: true },
        className: "purple-notification",
      });

      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#07071a] flex items-center justify-center px-4 py-20">
      {/* bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-900 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/40">
              <FaGamepad className="text-white text-lg" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              fake<span className="text-purple-400">gamers</span>
            </span>
          </Link>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">Be a Member</h1>
          <p className="text-gray-500 text-sm">Hey Gamer, register now for next rock</p>
        </div>

        {/* Card */}
        <div className="bg-[#0d0d2b] border border-purple-900/30 rounded-[28px] p-8 shadow-2xl shadow-purple-900/20">
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your Name"
                  className="w-full bg-purple-900/10 border border-purple-800/30 focus:border-purple-600/60 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
                />
              </div>
              {errors.name && <p className="text-purple-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="your@email.com"
                  className="w-full bg-purple-900/10 border border-purple-800/30 focus:border-purple-600/60 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
                />
              </div>
              {errors.email && <p className="text-purple-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Profile Image</label>
              <div className="relative">
                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", { required: "Profile image is required" })}
                  className="w-full bg-purple-900/10 border border-purple-800/30 focus:border-purple-600/60 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-400 focus:outline-none transition-colors file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-purple-600/30 file:text-white file:text-xs file:font-bold file:cursor-pointer"
                />
              </div>
              {errors.image && <p className="text-purple-400 text-xs mt-1">{errors.image.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                <input
                  type="password"
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
                  placeholder="••••••••"
                  className="w-full bg-purple-900/10 border border-purple-800/30 focus:border-purple-600/60 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
                />
              </div>
              {errors.password && <p className="text-purple-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full purple-btn text-white font-black py-4 rounded-xl uppercase tracking-widest text-sm disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? "Creating account..." : "Register Now"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
