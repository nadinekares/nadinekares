"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** InView margin, e.g. "-10%" */
  margin?: string;
  /** Animation duration in seconds (default 0.7) */
  duration?: number;
  /** Cubic-bezier ease array (default [0.16, 1, 0.3, 1]) */
  ease?: [number, number, number, number];
  /** Switch overflow to "visible" after the animation finishes */
  overflowAfter?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  className,
  margin,
  duration = 0.7,
  ease = [0.16, 1, 0.3, 1],
  overflowAfter = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    ...(margin ? { margin: margin as `${number}${"px" | "%"}` } : {}),
  });
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    if (overflowAfter && inView) {
      const timeout = setTimeout(() => setAnimationDone(true), (delay + duration) * 1000);
      return () => clearTimeout(timeout);
    }
  }, [overflowAfter, inView, delay, duration]);

  const overflow = overflowAfter ? (animationDone ? "visible" : "hidden") : "hidden";

  return (
    <div ref={ref} className={className} style={{ overflow }}>
      <motion.div
        initial={{ y: "100%" }}
        animate={inView ? { y: 0 } : { y: "100%" }}
        transition={{ duration, delay, ease }}
      >
        {children}
      </motion.div>
    </div>
  );
}
