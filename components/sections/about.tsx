"use client";

import { motion } from "motion/react";

const stats = [
  { value: "10", label: "Years of Experience" },
  { value: "50", label: "Projects" },
  { value: "30", label: "Clients" },
];

export function About() {
  return (
    <section id="about" className="bg-background px-6 py-24 md:px-10 md:py-32">
      <div className="md:grid md:grid-cols-12 md:gap-8">
        {/* Left — tag */}
        <motion.span
          className="mb-8 block text-xs font-normal uppercase tracking-[0.1em] text-muted-foreground font-label md:col-span-3 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          About
        </motion.span>

        {/* Right — bio + stats */}
        <div className="md:col-span-8 md:col-start-5">
          <motion.p
            className="max-w-2xl text-xl leading-relaxed text-foreground md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Nadine Kares is a creative studio specializing in brand identity and
            web design. Based between Vienna and Zurich, we craft distinctive
            visual experiences that connect brands with their audience — with
            precision, clarity, and a sharp eye for detail.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="mt-8 grid grid-cols-3 gap-6 pt-12 md:mt-12 md:gap-8 md:pt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="block font-heading tracking-tight text-foreground">
                  <span className="text-5xl md:text-7xl">{stat.value}</span>
                  <sup className="relative -top-8 ml-0.5 text-xl font-semibold md:-top-9 md:text-2xl">+</sup>
                </span>
                <span className="mt-2 block text-xs font-normal uppercase tracking-[0.1em] text-muted-foreground font-label">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
