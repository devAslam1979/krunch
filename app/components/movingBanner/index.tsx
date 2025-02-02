"use client";
import { motion } from "framer-motion";

const MovingBanner = ({ text }: { text: string }) => {
  return (
    <div className="w-full bg-orange-400 overflow-hidden py-2 flex">
      <motion.div
        className="text-white text-base font-normal whitespace-nowrap"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default MovingBanner;
