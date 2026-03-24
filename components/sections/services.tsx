"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

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

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollActiveIndex, setScrollActiveIndex] = useState<number | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);
  const [tilt, setTilt] = useState(0);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Detect mobile (<768px)
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // Scroll-based activation for mobile
  const handleScroll = useCallback(() => {
    if (!isMobile) return;

    const activationZone = window.innerHeight * 0.42;
    let closest: number | null = null;
    let closestDist = Infinity;

    serviceRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - activationZone);
      if (dist < rect.height && dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });

    setScrollActiveIndex(closest);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      setScrollActiveIndex(null);
      return;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, handleScroll]);

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
          <Reveal key={service.name} delay={0.2 + i * 0.1} overflowAfter>
            <div
              ref={(el) => {
                serviceRefs.current[i] = el;
              }}
              className="group relative cursor-pointer py-6 md:py-8"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setTilt(0);
              }}
              onMouseMove={handleMouseMove}
            >
              {/* Hover image — desktop only */}
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

              {/* Scroll-activated image — mobile only */}
              <AnimatePresence>
                {isMobile && scrollActiveIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
                    animate={{ opacity: 1, scale: 1, rotate: -3 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "bottom right" }}
                    className="pointer-events-none absolute right-0 top-1/2 z-10 h-[120px] w-[88px] -translate-y-1/2 overflow-hidden md:hidden"
                  >
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                      sizes="88px"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-baseline justify-between">
                <span
                  className={`inline-block font-heading text-3xl leading-none tracking-tight transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:translate-x-8 md:text-5xl ${
                    scrollActiveIndex === i
                      ? "translate-x-2 text-foreground md:translate-x-0"
                      : ""
                  } ${
                    scrollActiveIndex !== null && scrollActiveIndex !== i
                      ? "text-muted-foreground/40"
                      : "text-muted-foreground/40"
                  } ${
                    hoveredIndex === null || hoveredIndex === i
                      ? "md:group-hover:text-foreground"
                      : "md:text-muted-foreground/40"
                  } ${
                    hoveredIndex !== null && hoveredIndex !== i
                      ? ""
                      : "group-hover:translate-x-4 md:group-hover:translate-x-8"
                  }`}
                >
                  {service.name}
                </span>
                <span
                  className={`text-xs font-normal font-label transition-colors duration-700 ${
                    scrollActiveIndex !== null && scrollActiveIndex !== i
                      ? "text-muted-foreground/40"
                      : "text-muted-foreground/40"
                  } ${
                    hoveredIndex !== null && hoveredIndex !== i
                      ? "md:text-muted-foreground/40"
                      : ""
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
