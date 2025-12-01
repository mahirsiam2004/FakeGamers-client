import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import photo1 from "../assets/g1.jpg";
import photo2 from "../assets/g2.jpg";
import photo3 from "../assets/g3.jpg";

const slides = [
  {
    image: photo1,
    title: "Level Up Your Game!",
    subtitle: "Explore the newest worlds and legendary gear.",
  },
  {
    image: photo2,
    title: "Join the Warzone",
    subtitle: "Compete in daily tournaments for glory and prizes.",
  },
  {
    image: photo3,
    title: "Exclusive Beta Access",
    subtitle: "Be the first to play our next-gen title.",
  },
];

const Banner = () => {
  return (
    <div className="flex justify-center mx-auto py-2 px-2 sm:px-4 ">
      <div className="max-w-7xl w-full">
        <div className="shadow-3xl rounded-2xl overflow-hidden mb-8 fancy">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            transitionTime={700}
            stopOnHover={true}
            className="w-full"
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem]"
              >
                <img
                  src={slide.image}
                  alt={`Gallery Photo ${index + 1}`}
                  className="object-cover w-full h-full opacity-100"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4 sm:p-6 md:p-8 bg-opacity-30">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold  uppercase tracking-wider drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium ">
                    {slide.subtitle}
                  </p>
                  <button className="px-6 py-3 text-sm sm:text-lg font-bold text-white bg-red-600 rounded-lg hover:bg-black transition duration-300 transform hover:scale-105">
                    Start Quest Now
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="flex items-center justify-center px-10 py-4 text-xl mono font-bold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
            Explore games
          </button>

          <button className="flex items-center justify-center px-10 py-4 text-xl mono font-bold text-white bg-red-600 rounded-full shadow-lg hover:bg-black transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
            In Game TopUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
