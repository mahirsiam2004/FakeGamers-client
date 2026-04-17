import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import {
  FaGamepad,
  FaStar,
  FaDownload,
  FaRocket,
  FaShieldAlt,
  FaMicrochip,
  FaHeadset,
  FaArrowRight,
  FaUserCircle,
  FaShoppingCart,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const GameDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data: game = {}, isLoading } = useQuery({
    queryKey: ["game", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/game/${id}`);
      return data;
    },
  });

  const { data: purchaseData = {}, isLoading: isPurchaseLoading } = useQuery({
    queryKey: ["purchase", user?.email, id],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/purchased/${user?.email}/${id}`);
      return data;
    },
  });

  if (isLoading || isPurchaseLoading) {
    return (
      <div className="min-h-screen bg-[#07071a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-purple-400 font-black uppercase tracking-widest text-sm">Loading Game...</p>
        </div>
      </div>
    );
  }

  const { _id, image, title, description, genre, price, owner, link } = game;
  const isOwner    = user?.email === owner?.email;
  const isPurchased = purchaseData?.purchased;

  const handlePayment = async () => {
    if (!user) return navigate("/login");
    try {
      const response = await axiosPublic.post("/create-checkout-session", {
        gameId: _id, title, price, image, customerEmail: user.email,
      });
      if (response.data.url) window.location.href = response.data.url;
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const features = [
    { title: "Ultra Low Latency", desc: "Experience lag-free gaming with our high-speed network.", icon: <FaRocket /> },
    { title: "DDoS Protection",   desc: "Enterprise-grade protection to keep your server online.", icon: <FaShieldAlt /> },
    { title: "Instant Setup",     desc: "Your server will be ready in less than 5 minutes.",       icon: <FaMicrochip /> },
    { title: "24/7 Support",      desc: "Our experts are always here to help you.",                icon: <FaHeadset /> },
  ];

  return (
    <div className="min-h-screen bg-[#07071a] text-white py-24 px-6">
      {/* bg glow */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* ── HERO ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-7"
          >
            <div className="inline-flex items-center gap-2 bg-purple-600/10 border border-purple-600/20 px-4 py-2 rounded-full text-purple-400 text-xs font-black uppercase tracking-widest">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              Instant Deployment
            </div>

            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              {title?.split(" ")[0]} <br />
              <span className="text-gray-600">{title?.split(" ").slice(1).join(" ")}</span>
            </h1>

            <div className="flex items-center gap-6 text-gray-400 font-bold uppercase tracking-widest text-xs">
              <div className="flex items-center gap-2">
                <FaGamepad className="text-purple-400" /> {genre}
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" /> 4.8 Rating
              </div>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">{description}</p>

            <div className="flex flex-wrap gap-4 pt-2">
              {isOwner || isPurchased ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="purple-btn text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-3"
                >
                  <FaDownload /> Download Now
                </a>
              ) : (
                <button
                  onClick={handlePayment}
                  className="purple-btn text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-3"
                >
                  <FaShoppingCart /> Buy Now — ${price}
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-purple-600/15 blur-3xl rounded-full pointer-events-none" />
            <img
              src={image}
              alt={title}
              className="w-full aspect-video object-cover rounded-[32px] relative z-10 border border-purple-900/30 shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-[#0d0d2b] border border-purple-900/30 p-6 rounded-[24px] z-20 shadow-2xl">
              <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Starting at</div>
              <div className="text-3xl font-black text-white">
                ${price}<span className="text-purple-400 text-sm">/mo</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── DETAILS ── */}
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">
                Server <span className="text-gray-600">Features</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#0d0d2b] border border-purple-900/20 p-7 rounded-[24px] hover:border-purple-600/30 transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 bg-purple-600/10 rounded-xl flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-base font-black uppercase tracking-tight mb-2">{feature.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            {/* Seller */}
            <div className="bg-[#0d0d2b] border border-purple-900/20 p-7 rounded-[32px]">
              <h3 className="text-lg font-black uppercase tracking-tight mb-7">Seller Information</h3>
              <div className="flex items-center gap-4 mb-7">
                {owner?.image ? (
                  <img
                    src={owner.image}
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://i.ibb.co/7p0dK9D/avatar-placeholder.png"; }}
                    alt={owner.name}
                    className="w-14 h-14 rounded-full border-2 border-purple-600/40 object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-14 h-14 text-purple-400" />
                )}
                <div>
                  <div className="font-black uppercase tracking-tight text-white text-sm">{owner?.name}</div>
                  <div className="text-[11px] text-gray-500 uppercase font-black tracking-widest">Verified Developer</div>
                </div>
              </div>
              <div className="space-y-3 mb-7">
                {[["Joined", "Jan 2024"], ["Games", "12 Assets"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-500">
                    <span>{k}</span>
                    <span className="text-white">{v}</span>
                  </div>
                ))}
              </div>
              <button className="w-full bg-purple-900/20 hover:bg-purple-900/40 border border-purple-800/30 hover:border-purple-600/40 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs transition-all">
                Contact Seller
              </button>
            </div>

            {/* Help */}
            <div className="bg-gradient-to-br from-purple-600/15 to-transparent border border-purple-600/20 p-7 rounded-[32px]">
              <h3 className="text-lg font-black uppercase tracking-tight mb-3">Need Help?</h3>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                Our support team is available 24/7 to assist you with any questions or technical issues.
              </p>
              <button className="text-purple-400 font-black uppercase tracking-widest text-xs flex items-center gap-2 group hover:gap-4 transition-all">
                Visit Help Center <FaArrowRight />
              </button>
            </div>
          </aside>
        </div>
      </motion.div>
    </div>
  );
};

export default GameDetails;
