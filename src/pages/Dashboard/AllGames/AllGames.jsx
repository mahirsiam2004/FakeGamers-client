import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router";

const AllGames = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: games = [], isLoading } = useQuery({
    queryKey: ["all-games"],
    queryFn: async () => {
      const res = await axiosSecure.get("/games");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/game/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-games"]);
      toast.success("Game deleted successfully");
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-black">Manage All Games</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
        <table className="table w-full">
          <thead>
            <tr className="text-gray-700">
              <th>Title</th>
              <th>Owner</th>
              <th>Price</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game._id} className="text-gray-600">
                <td>{game.title}</td>
                <td>{game.owner?.email}</td>
                <td>${game.price}</td>
                <td>{game.genre}</td>
                <td className="flex gap-2">
                  <Link to={`/dashboard/updateGames/${game._id}`} className="btn btn-ghost text-blue-600">
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => deleteMutation.mutate(game._id)}
                    className="btn btn-ghost text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllGames;
