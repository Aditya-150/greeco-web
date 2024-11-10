/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
// import Image from "next/image";

export default function Hero() {
  return (
    <div>
      <motion.div>Hero</motion.div>
      <img alt="hero image" src="/header_image.webp" />
    </div>
  );
}
