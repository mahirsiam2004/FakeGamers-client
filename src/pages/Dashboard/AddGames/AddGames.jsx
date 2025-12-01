import React from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../utils/upload";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
const AddGames = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const coverImage = watch("image");
const {user}=useAuth();

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/games`, payload),
    onSuccess: (data) => {
      console.log(data);

      toast.success("Game Added successfully");
      // navigate to my inventory page
      mutationReset();
      // Query key invalidate
    },
    onError: (error) => {
      console.log(error);
    },
    onMutate: (payload) => {
      console.log("I will post this data--->", payload);
    },
    onSettled: (data, error) => {
      console.log("I am from onSettled--->", data);
      if (error) console.log(error);
    },
    retry: 3,
  });





  const handleUpload = async (data) => {
    const { title, discription, image, genre, price, link } = data;
    const imageFile = image[0];

    console.log("Form Data:", data);

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

  return (
    <div className="bg-gray-50 py-8 px-4 sm:py-12 mono">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-black">
            Upload to{" "}
            <span className="text-red-5xl text-red-600">FAKEGAMERS</span>
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Time to drop the next banger.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-black text-white p-6 text-center">
            <h2 className="text-2xl font-bold">ADD NEW GAME</h2>
          </div>

          <form
            onSubmit={handleSubmit(handleUpload)}
            className="p-6 sm:p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                GAME TITLE
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="e.g. BloodStrike 2025"
                className="w-full px-5 py-3.5 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none text-black text-lg font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">
                DESCRIPTION
              </label>
              <textarea
                {...register("description", { required: true })}
                rows="3"
                placeholder="Make it epic..."
                className="w-full px-5 py-3 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  GENRE
                </label>
                <select
                  {...register("genre", { required: true })}
                  className="w-full px-5 py-3.5 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none"
                >
                  <option value="">Choose genre</option>
                  <option>Action</option>
                  <option>Shooter</option>
                  <option>Horror</option>
                  <option>Racing</option>
                  <option>RPG</option>
                  <option>Battle Royale</option>
                  <option>Indie</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  PRICE
                </label>
                <input
                  {...register("price", { required: true })}
                  type="number"
                  placeholder="set your price"
                  className="w-full px-5 py-3.5 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none font-bold text-red-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-3">
                GAME COVER (Recommended: 512×512 or bigger)
              </label>
              {coverImage && coverImage[0] ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(coverImage[0])}
                    alt="cover"
                    className="w-full h-64 object-cover rounded-xl border-4 border-red-600"
                  />
                </div>
              ) : (
                <label className="block w-full h-64 border-4 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-red-600 transition flex flex-col items-center justify-center bg-gray-50">
                  <svg
                    className="w-12 h-12 text-red-600 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="text-black font-bold">
                    Click to Upload Cover
                  </span>
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">
                DOWNLOAD LINK (Direct link only)
              </label>
              <input
                {...register("link", { required: true })}
                type="url"
                placeholder="https://drive.google.com/file/d/..."
                className="w-full px-5 py-3.5 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none"
              />
            </div>

            <div className="text-center pt-6">
              <button
                type="submit"
                className="w-full sm:w-auto px-16 py-5 bg-red-600 hover:bg-red-700 text-white text-xl font-black rounded-xl uppercase tracking-wider transform hover:scale-105 transition duration-300 shadow-lg"
              >
                Submit Game Now
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-gray-500 mt-8 text-sm">
          © 2025 <span className="text-red-600 font-bold">FAKEGAMERS</span> —
          Built for real gamers
        </p>
      </div>
    </div>
  );
};

export default AddGames;
