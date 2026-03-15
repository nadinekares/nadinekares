"use client";

import { motion } from "motion/react";

export function HeroVariantB() {
  return (
    <section className="relative flex min-h-screen items-end bg-background pb-16 sm:items-center sm:pb-0">
      {/* Large decorative letter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none"
      >
        <span className="text-[40rem] font-extralight leading-none tracking-tighter text-foreground">
          N
        </span>
      </motion.div>

      <div className="relative z-10 w-full px-8 sm:px-12 md:px-20 lg:px-28">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8 flex items-center gap-4"
          >
            <div className="h-px w-12 bg-foreground" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
              brands & websites
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-5xl font-extralight leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Nadine
            <br />
            <span className="font-light italic">Kares</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground"
          >
            I craft distinctive brand identities and digital experiences
            that elevate your vision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            className="mt-10 flex items-center gap-8"
          >
            <a
              href="#work"
              className="text-sm font-medium uppercase tracking-[0.2em] text-foreground transition-colors duration-300 hover:text-muted-foreground"
            >
              Selected Work
            </a>
            <a
              href="https://cal.com/nadine-kares-design"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom line accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-border"
      />
    </section>
  );
}
