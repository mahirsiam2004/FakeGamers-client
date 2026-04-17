import React from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../utils/upload";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaUpload, FaGamepad } from "react-icons/fa";

const AddGames = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, watch } = useForm();
  const coverImage = watch("image");
  const { user } = useAuth();

  const { isPending, mutateAsync, reset: mutationReset } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.post("/games", payload),
    onSuccess: () => {
      toast.success("Game added successfully!");
      mutationReset();
    },
    onError: (error) => {
      toast.error("Failed to add game");
      console.error(error);
    },
    retry: 3,
  });

  const handleUpload = async (data) => {
    const { title, discription, image, genre, price, link } = data;
    const imageFile = image[0];
    const imageURL = await imageUpload(imageFile);

    const gameData = {
      image: imageURL,
      title,
      discription,
      price: Number(price),
      genre,
      link,
      owner: {
        image: user?.photoURL,
        name: user?.displayName,
        email: user?.email,
      },
      createdAt: new Date().toISOString(),
    };

    await mutateAsync(gameData);
    reset();
  };

  const inputClass = "w-full bg-purple-900/10 border border-purple-800/30 focus:border-purple-600/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors";
  const labelClass = "block text-xs font-black uppercase tracking-widest text-gray-400 mb-2";

  return (
    <div className="min-h-screen bg-[#07071a] py-10 px-6">
      {/* Loading overlay */}
      {isPending && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-white text-lg font-black mt-4 tracking-wider uppercase">Uploading...</p>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-600/20 border border-purple-600/30 rounded-xl flex items-center justify-center text-purple-400">
              <FaGamepad />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Add New Game</h1>
              <p className="text-gray-500 text-sm">Upload to FakeGamers</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[#0d0d2b] border border-purple-900/20 rounded-[28px] overflow-hidden">
          <form onSubmit={handleSubmit(handleUpload)} className="p-8 space-y-6">
            {/* Title */}
            <div>
              <label className={labelClass}>Game Title</label>
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="e.g. BloodStrike 2025"
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                {...register("description", { required: true })}
                rows="3"
                placeholder="Make it epic..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Genre + Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Genre</label>
                <select
                  {...register("genre", { required: true })}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="" className="bg-[#0d0d2b]">Choose genre</option>
                  {["Action", "Shooter", "Horror", "Racing", "RPG", "Battle Royale", "Indie"].map((g) => (
                    <option key={g} value={g} className="bg-[#0d0d2b]">{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Price ($)</label>
                <input
                  {...register("price", { required: true })}
                  type="number"
                  placeholder="0 for free"
                  className={`${inputClass} text-purple-400 font-bold`}
                />
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className={labelClass}>Game Cover</label>
              {coverImage && coverImage[0] ? (
                <div className="relative rounded-xl overflow-hidden border-2 border-purple-600/40">
                  <img
                    src={URL.createObjectURL(coverImage[0])}
                    alt="cover"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-bold">Cover selected ✓</span>
                  </div>
                </div>
              ) : (
                <label className="block w-full h-48 border-2 border-dashed border-purple-800/40 hover:border-purple-600/60 rounded-xl cursor-pointer transition-colors flex flex-col items-center justify-center bg-purple-900/5 hover:bg-purple-900/10 group">
                  <FaUpload className="text-purple-600 text-3xl mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-400 font-bold text-sm">Click to Upload Cover</span>
                  <span className="text-gray-600 text-xs mt-1">Recommended: 512×512 or larger</span>
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Download Link */}
            <div>
              <label className={labelClass}>Download Link</label>
              <input
                {...register("link", { required: true })}
                type="url"
                placeholder="https://drive.google.com/file/d/..."
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              className="w-full purple-btn text-white font-black py-4 rounded-xl uppercase tracking-widest text-sm mt-2"
            >
              Submit Game Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGames;
