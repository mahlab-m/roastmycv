"use client";

import { motion } from "framer-motion";

export function AnimatedText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4 } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
