import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import {
  FaUser,
  FaGamepad,
  FaCalendarAlt,
  FaTag,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const GameDetails = () => {
  const { id } = useParams();
const {user}=useAuth()
  const { data: game = {}, isLoading } = useQuery({
    queryKey: ["game", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/game/${id}`
      );
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-red-600 text-xl font-semibold"
        >
          Loading Game...
        </motion.div>
      </div>
    );
  }

  const {_id, image, title, description, genre, price, owner, createdAt, link } =
    game;


const handlePayment=async ()=>{
  const paymentInfo = {
    gameId: _id,
    title,
    description,
    genre,
    price,
    image,
    owner,
    link,
    customer: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
  };

  const result = await axios.post(
    `${import.meta.env.VITE_API_URL}/create-cheakout-session`,paymentInfo
  );
}


  return (
    <div className="min-h-screen bg-white text-black py-14 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* HERO IMAGE */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-red-200 bg-white">
          <motion.img
            src={image}
            alt={title}
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-64 object-cover" // <-- SMALLER IMAGE
          />
        </div>

        {/* TITLE */}
        <div className="mt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-700">
            {title}
          </h1>

          <div className="flex items-center gap-4 mt-3 text-gray-600">
            <FaGamepad className="text-red-500" />
            <span className="text-lg font-medium">{genre}</span>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-12 grid md:grid-cols-3 gap-12">
          {/* LEFT SIDE */}
          <div className="md:col-span-2 space-y-10">
            {/* ABOUT GAME */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-red-600 flex items-center gap-2">
                <FaTag /> About This Game
              </h2>
              <p className="text-gray-700 mt-4 leading-relaxed text-lg">
                {description}
              </p>
            </motion.div>

            {/* FEATURES */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { text: "High Quality", icon: <FaStar /> },
                { text: "Safe Purchase", icon: <FaUser /> },
                { text: "Instant Download", icon: <FaGamepad /> },
                { text: "Lifetime Access", icon: <FaCalendarAlt /> },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-red-50 border border-red-200 p-5 rounded-lg flex items-center gap-4"
                >
                  <div className="text-red-600 text-xl">{f.icon}</div>
                  <p className="font-medium text-gray-800">{f.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* PURCHASE CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-red-300 p-8 rounded-2xl shadow-md"
          >
            <div className="text-4xl font-extrabold text-red-600">${price}</div>
            <p className="text-gray-500 mt-2">One time purchase</p>

            <motion.button
            onClick={handlePayment}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition"
            >
              
              <FaShoppingCart /> BUY NOW
            </motion.button>

            <p className="mt-5 text-xs text-gray-500 text-center">
              Secure checkout • Instant access
            </p>
          </motion.div>
        </div>

        {/* SELLER INFO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-red-50 border border-red-200 p-8 rounded-2xl flex items-center gap-8"
        >
          <img
            src={owner?.image}
            alt={owner?.name}
            className="w-20 h-20 rounded-full border-4 border-red-400 object-cover"
          />

          <div>
            <h3 className="text-xl font-bold text-red-600 flex items-center gap-2">
              <FaUser /> Seller Info
            </h3>
            <p className="text-lg font-semibold text-gray-800">{owner?.name}</p>
            <p className="text-gray-600">{owner?.email}</p>
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
              <FaCalendarAlt />
              Uploaded on{" "}
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="ml-auto">
            <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Verified Seller
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GameDetails;
// not fixed