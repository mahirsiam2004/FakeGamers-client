import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const MyGames = () => {
  const { user } = useAuth();

  // Fetch games
  const {
    data: games = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myGames", user?.email],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-games/${user?.email}`
      );
      return result.data;
    },
    enabled: !!user?.email,
  });

  // Delete handler (just toast for now)
  const handleDelete = (id) => {
    toast.error("Delete clicked (no functionality yet)");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-20 h-20 border-8 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          My <span className="text-red-600">Games</span>
        </h1>

        {games.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">
            No games uploaded yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <div
                key={game._id}
                className="bg-white rounded-xl shadow-md overflow-hidden relative hover:shadow-xl transition-shadow duration-300"
              >
                {/* Premium / Free badge */}
                {game.price > 50 && (
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full uppercase shadow">
                    Premium
                  </span>
                )}
                {game.price === 0 && (
                  <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full uppercase shadow">
                    Free
                  </span>
                )}

                {/* Image */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={
                      game.image ||
                      "https://via.placeholder.com/400x300/111/fff?text=NO+IMAGE"
                    }
                    alt={game.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <h2 className="text-lg font-bold truncate">{game.title}</h2>
                  <p className="text-gray-500 text-sm">{game.genre}</p>
                  <p className="text-red-600 font-bold text-lg">
                    {game.price > 0 ? `$${game.price}` : "FREE"}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg flex items-center justify-center gap-2 transition">
                      <FiEdit2 /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(game._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGames;
