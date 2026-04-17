import React from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaGamepad, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

const Login = () => {
  const { signInWithGoogle, signInUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const handleLogin = async (data) => {
    try {
      await signInUser(data.email, data.password);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Login failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Login Successful, Let's Rock!");
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Google login failed");
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
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Hey Gamer, login now for next rock</p>
        </div>

        {/* Card */}
        <div className="bg-[#0d0d2b] border border-purple-900/30 rounded-[28px] p-8 shadow-2xl shadow-purple-900/20">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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

            {/* Password */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
                <input
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  placeholder="••••••••"
                  className="w-full bg-purple-900/10 border border-purple-800/30 focus:border-purple-600/60 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
                />
              </div>
              {errors.password && <p className="text-purple-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="text-right">
              <a href="#" className="text-xs text-purple-400 hover:text-purple-300 font-bold transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full purple-btn text-white font-black py-4 rounded-xl uppercase tracking-widest text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-purple-900/40" />
            <span className="text-gray-600 text-xs font-bold uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-purple-900/40" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white/5 hover:bg-white/10 border border-purple-800/30 hover:border-purple-600/40 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all text-sm"
          >
            <FaGoogle className="text-purple-400" />
            Login with Google
          </button>

          <p className="text-center text-gray-500 text-sm mt-6">
            New at FakeGamers?{" "}
            <Link to="/register" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
