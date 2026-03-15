"use client";

import { type ReactNode, useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";

const services = [
  {
    name: "Creative Direction",
    image: "/images/services/creative-direction.jpg",
  },
  {
    name: "Identity Design",
    image: "/images/services/identity-design.jpg",
  },
  {
    name: "UI/UX Design",
    image: "/images/services/ui-ux-design.jpg",
  },
  {
    name: "No-Code & Code Dev",
    image: "/images/services/no-code-dev.jpg",
  },
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
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => setAnimationDone(true), (delay + 0.7) * 1000);
      return () => clearTimeout(timeout);
    }
  }, [inView, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ overflow: animationDone ? "visible" : "hidden" }}
    >
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tilt, setTilt] = useState(0);

  const baseTilt = -3; // always tilted slightly to the left
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 → 1
    // base tilt + extra ±8° from mouse position
    setTilt(baseTilt + (x - 0.5) * 16);
  }

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

      {/* Service list */}
      <div className="mt-12 md:mt-16">
        {services.map((service, i) => (
          <Reveal key={service.name} delay={0.2 + i * 0.1}>
            <div
              className="group relative cursor-pointer py-6 md:py-8"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => { setHoveredIndex(null); setTilt(0); }}
              onMouseMove={handleMouseMove}
            >
              {/* Hover image — centered on this row, desktop only */}
              {hoveredIndex === i && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: tilt }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "bottom right" }}
                  className="pointer-events-none absolute right-[10%] top-1/2 z-10 hidden h-[380px] w-[280px] -translate-y-1/2 overflow-hidden md:block lg:right-[12%] lg:h-[440px] lg:w-[320px]"
                >
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </motion.div>
              )}

              <div className="flex items-baseline justify-between">
                <span
                  className={`inline-block font-heading text-3xl leading-none tracking-tight transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 md:text-5xl md:group-hover:translate-x-8 ${
                    hoveredIndex === null || hoveredIndex === i
                      ? "text-muted-foreground group-hover:text-foreground"
                      : "text-muted-foreground/40"
                  }`}
                >
                  {service.name}
                </span>
                <span
                  className={`text-xs font-normal font-label transition-colors duration-700 ${
                    hoveredIndex === null || hoveredIndex === i
                      ? "text-muted-foreground"
                      : "text-muted-foreground/40"
                  }`}
                >
                  ({String(i + 1).padStart(2, "0")})
                </span>
              </div>
              <div className="mt-6 h-px w-full bg-foreground/20 md:mt-8" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
