// GamesPage.jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Atom } from "react-loading-indicators";
import PremiumCard from "../../components/premiumCard/PremiumCard";

const GamesPage = () => {
  const {
    data: games = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/games`);
      return result.data;
    },
  });

  if (isLoading) {
    return (
      <div className="mt-20 flex justify-center">
        <Atom color="#f10808" size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-bold mt-20">
        Failed to load games.
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <h1 className="text-red-500 font-semibold text-4xl mt-20 text-center">
        All Games
      </h1>

      {/* Games Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {games.length > 0 ? (
          games.map((game) => (
            <PremiumCard key={game._id || game.id} game={game} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No games available.
          </p>
        )}
      </div>
    </div>
  );
};

export default GamesPage;
