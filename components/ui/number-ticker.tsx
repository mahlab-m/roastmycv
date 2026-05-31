"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function NumberTicker({ value, className }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function update(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }, [inView, value]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {display}
    </motion.span>
  );
}
