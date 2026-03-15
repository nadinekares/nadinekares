"use client";

import { type ReactNode, useRef } from "react";
import { motion, useInView } from "motion/react";

const services = [
  "Creative Direction",
  "Identity Design",
  "UI/UX Design",
  "No-Code & Code Dev",
];

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "100%" }}
        animate={inView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-background px-6 py-24 md:px-10 md:py-32">
      {/* Tag + heading row */}
      <div className="md:grid md:grid-cols-12 md:items-start md:gap-8">
        {/* Left — tag, nudged down to align capline with heading */}
        <Reveal
          className="mb-8 text-xs font-normal uppercase tracking-[0.1em] text-muted-foreground font-label md:col-span-3 md:mb-0 md:mt-[8px]"
          delay={0}
        >
          Services
        </Reveal>

        {/* Right — title */}
        <div className="md:col-span-9 md:col-start-4">
          <Reveal delay={0.1}>
            <h2 className="font-heading text-6xl leading-none tracking-tight text-foreground md:text-8xl">
              This is what I do
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Service list — full width */}
      <div className="mt-12 md:mt-16">
        {services.map((service, i) => (
          <Reveal key={service} delay={0.2 + i * 0.1}>
            <div className="border-t border-muted py-6 md:py-8">
              <span className="font-heading text-3xl leading-none tracking-tight text-foreground md:text-5xl">
                {service}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
