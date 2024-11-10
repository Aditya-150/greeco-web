"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <div>
      <motion.div>Hero</motion.div>
      <Image src="/header_image.webp" width={480} height={480} alt="hero image"/>
    </div>
  );
}
