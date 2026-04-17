import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import { FaCheckCircle, FaDownload, FaArrowRight } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const gameId = searchParams.get("gameId");
  const [status, setStatus] = useState("verifying");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      axiosPublic
        .get(`/verify-payment/${sessionId}`)
        .then((res) => {
          if (res.data.success) {
            setStatus("success");
          } else {
            setStatus("failed");
          }
        })
        .catch(() => setStatus("failed"));
    }
  }, [sessionId, axiosPublic]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border-4 border-black text-center"
      >
        {status === "verifying" && (
          <div className="space-y-6">
            <div className="w-20 h-20 border-8 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Verifying Payment...</h2>
            <p className="text-gray-500">Please don't close this page while we confirm your purchase.</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6">
            <div className="text-green-500 flex justify-center">
              <FaCheckCircle size={80} />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Payment Successful!</h2>
            <p className="text-gray-600 font-bold">Your game is ready for download. Level up your library!</p>
            
            <div className="flex flex-col gap-3 pt-6">
              <Link
                to={`/details/${gameId}`}
                className="w-full bg-black hover:bg-red-600 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition duration-300 border-2 border-red-600"
              >
                <FaDownload /> DOWNLOAD GAME
              </Link>
              <Link
                to="/dashboard/myDownloads"
                className="text-gray-500 hover:text-black font-bold flex items-center justify-center gap-2 transition"
              >
                Go to My Downloads <FaArrowRight />
              </Link>
            </div>
          </div>
        )}

        {status === "failed" && (
          <div className="space-y-6">
            <div className="text-red-600 text-6xl font-black">!</div>
            <h2 className="text-2xl font-black uppercase">Verification Failed</h2>
            <p className="text-gray-500">Something went wrong. If you were charged, please contact support.</p>
            <Link
              to="/"
              className="block w-full bg-red-600 text-white font-bold py-3 rounded-xl"
            >
              Back to Home
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
