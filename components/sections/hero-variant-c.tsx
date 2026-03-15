"use client";

import { motion } from "motion/react";

export function HeroVariantC() {
  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-foreground px-6 py-8 sm:px-12 sm:py-12">
      {/* Top bar */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 flex items-center justify-between"
      >
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Design Studio
        </span>
        <a
          href="https://cal.com/nadine-kares-design"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-background"
        >
          Contact
        </a>
      </motion.nav>

      {/* Center content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        {/* Animated circle accent */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="absolute h-64 w-64 rounded-full border border-border sm:h-80 sm:w-80 md:h-[28rem] md:w-[28rem]"
        />

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="relative text-center text-5xl font-extralight tracking-tight text-background sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Nadine
          <br />
          Kares
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="relative mt-8 text-center text-xs font-light uppercase tracking-[0.4em] text-muted-foreground"
        >
          brands & websites
        </motion.p>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="relative z-10 flex items-end justify-between"
      >
        <span className="text-xs text-muted-foreground">Based in Germany</span>
        <a
          href="#work"
          className="group flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-background"
        >
          Explore
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-4-4m4 4l4-4" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
