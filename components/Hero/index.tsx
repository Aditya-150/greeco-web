/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

// import Image from "next/image";

export default function Hero() {
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    // Start the animation when the page loads
    setAnimationPlayed(true);
  }, []);
  const imgVariants = {
    start: {
      x: -64,
      y: -64,
    },
    end: {
      x: 0,
      y: 0,
    }
  }
  return (
    <div className="bg-[#045D1D] rounded-b-3xl">
      <div className="max-w-7xl mx-auto px-6 2xl:px-0 flex flex-row justify-between items-center sm:pb-40 pb-20 pt-32 sm:pt-48">
        <div className="hidden xl:flex flex-col">
          <h1 className="font-main text-white font-bold text-[40px]">
            Empowering{" "}
            <span className="relative">
              Sustainable{" "}
              <svg
                width="223"
                height="13"
                viewBox="0 0 223 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-0 -bottom-2"
              >
                <motion.path
                  d="M4.9734 10.8325C4.9734 10.8325 -15.6158 6.25691 53.1348 4.44849C121.885 2.64007 104.272 3.10342 104.272 3.10342C104.272 3.10342 132.681 2.3562 161.09 1.60889C189.5 0.861572 222.589 5.10848 222.589 5.10848"
                  stroke="#4FE309"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={animationPlayed ? { pathLength: 1 } : {}}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </span>
            <br /> Choices for Businesses.
          </h1>
          <p className="text-white mt-2 w-2/3">
            Connecting you with sustainable products directly from
            manufacturers.
          </p>
          <button className="px-6 py-2 bg-white font-medium rounded-full inline-flex items-center gap-x-2 self-start mt-16 group hover:bg-brown hover:text-white transition-all duration-300 ease-in-out">
            Request a Quote{" "}
            <span className="bg-brown rounded-full p-1">
              <ArrowRightIcon color="white" className="size-4" />
            </span>
          </button>
        </div>
        <div className="relative 2xl:scale-105 hidden xl:block">
          <motion.img
            alt="hero image"
            src="/header_image.webp"
            className="absolute -bottom-16 -right-16"
            variants={imgVariants}
            initial="start"
            animate="end"
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          />
          <img alt="hero image" src="/Header_pattern.webp" />
        </div>
        <div
          className="w-full h-full max-sm:px-6 max-sm:py-16 sm:p-20 rounded-3xl overflow-hidden bg-cover bg-center bg-no-repeat relative flex xl:hidden flex-col justify-center items-center text-center"
          style={{ backgroundImage: "url('/hero-bg.webp')" }}
        >
          <div className="bg-black bg-opacity-45 w-full h-full absolute top-0 left-0"></div>
          <div className="relative z-10 flex flex-col justify-center items-center text-center">
            <h1 className="font-main text-white font-bold sm:text-[40px] text-2xl">
              Empowering{" "}
              <span className="relative">
                Sustainable{" "}
                <svg
                  width="223"
                  height="13"
                  viewBox="0 0 223 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -left-10 sm:left-0 -bottom-2 max-sm:scale-[0.65]"
                >
                  <motion.path
                    d="M4.9734 10.8325C4.9734 10.8325 -15.6158 6.25691 53.1348 4.44849C121.885 2.64007 104.272 3.10342 104.272 3.10342C104.272 3.10342 132.681 2.3562 161.09 1.60889C189.5 0.861572 222.589 5.10848 222.589 5.10848"
                    stroke="#4FE309"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={animationPlayed ? { pathLength: 1 } : {}}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  />
                </svg>
              </span>
              <br /> Choices for Businesses.
            </h1>
            <p className="text-white mt-2">
              Connecting you with sustainable products directly from
              manufacturers.
            </p>
            <button className="px-6 py-2 bg-white font-medium rounded-full inline-flex items-center gap-x-2 self-center mt-16 group hover:bg-brown hover:text-white transition-all duration-300 ease-in-out">
              Request a Quote{" "}
              <span className="bg-brown rounded-full p-1">
                <ArrowRightIcon color="white" className="size-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
