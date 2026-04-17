import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { FaTrash, FaPlus } from "react-icons/fa";

const ManageNews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: news = [], isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await axiosSecure.get("/news");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/news/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["news"]);
      toast.success("News deleted successfully");
    },
  });

  const handleAddNews = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const excerpt = form.excerpt.value;
    const category = form.category.value;
    const image = form.image.value;

    const newArticle = { title, excerpt, category, image };
    
    try {
      await axiosSecure.post("/news", newArticle);
      toast.success("News added successfully");
      queryClient.invalidateQueries(["news"]);
      form.reset();
    } catch (error) {
      toast.error("Failed to add news");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8">Manage News</h2>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-10">
        <h3 className="text-xl font-bold mb-4">Add New Article</h3>
        <form onSubmit={handleAddNews} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" placeholder="Title" className="input input-bordered w-full" required />
          <input name="category" placeholder="Category (e.g. Update, Event)" className="input input-bordered w-full" required />
          <input name="image" placeholder="Image URL" className="input input-bordered w-full" required />
          <textarea name="excerpt" placeholder="Excerpt" className="textarea textarea-bordered w-full md:col-span-2" required />
          <button type="submit" className="btn btn-primary md:col-span-2 flex items-center gap-2">
            <FaPlus /> Add News
          </button>
        </form>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => deleteMutation.mutate(item._id)}
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

export default ManageNews;
