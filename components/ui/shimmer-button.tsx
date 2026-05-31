"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function ShimmerButton({ children, onClick, className }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative overflow-hidden bg-red-500 text-white font-semibold px-8 py-4 rounded-lg text-lg ${className}`}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
