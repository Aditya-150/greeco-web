/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
// import Image from "next/image";

export default function Hero() {
  return (
    <div>
      <motion.div>Hero</motion.div>
      <div>
        <img alt="hero image" src="/header_image.webp" />
        <img alt="hero image" src="/Header_pattern.webp" />
      </div>
    </div>
  );
}
