"use client";

import { type ReactNode, useRef } from "react";
import Image from "next/image";
import {
  type MotionValue,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";

const stats = [
  { value: "10", label: "Years of Experience" },
  { value: "50", label: "Projects" },
  { value: "30", label: "Clients" },
];

const bioLines = [
  "I'm a designer specializing in brand identity and web design.",
  "Based between Vienna and Zurich, I craft distinctive visual",
  "experiences that connect brands with their audience —",
  "with precision, clarity, and a sharp eye for detail.",
];

const aboutImages = [
  { src: "/images/about-1.jpg", alt: "Studio work — brand identity", ratio: 3 / 4 },
  { src: "/images/about-2.jpg", alt: "Studio work — web design", ratio: 3 / 3.4 },
  { src: "/images/about-3.jpg", alt: "Studio work — visual direction", ratio: 3 / 2.8 },
  { src: "/images/about-4.jpg", alt: "Studio work — creative process", ratio: 3 / 2.2 },
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

function LineByLineReveal({
  lines,
  className,
  baseDelay = 0,
  stagger = 0.08,
}: {
  lines: string[];
  className?: string;
  baseDelay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <p ref={ref} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="block"
          style={{ overflow: "clip" }}
        >
          <motion.span
            className="block"
            initial={{ y: "100%", opacity: 0 }}
            animate={
              inView
                ? { y: 0, opacity: 1 }
                : { y: "100%", opacity: 0 }
            }
            transition={{
              duration: 1.2,
              delay: baseDelay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </p>
  );
}

const TARGET_RATIO = aboutImages[0].ratio; // 3/4 — tallest image

function ImageCard({
  img,
  index,
  scrollYProgress,
}: {
  img: (typeof aboutImages)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Image 1 stays fixed; others animate from their initial ratio → image 1's ratio
  const aspectRatio = useTransform(
    scrollYProgress,
    [0, 1],
    [img.ratio, index === 0 ? img.ratio : TARGET_RATIO],
  );

  return (
    <motion.div
      className="relative overflow-hidden bg-muted"
      style={{ aspectRatio }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
    </motion.div>
  );
}

export function About() {
  const imageRowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRowRef,
    offset: ["start end", "start 0.2"],
  });

  return (
    <section id="about" className="bg-background px-6 py-24 md:px-10 md:py-32">
      <div className="md:grid md:grid-cols-12 md:gap-8">
        {/* Left — tag */}
        <Reveal
          className="mb-8 text-xs font-normal uppercase tracking-[0.1em] text-muted-foreground font-label md:col-span-3 md:mb-0"
          delay={0}
        >
          About
        </Reveal>

        {/* Right — bio + stats */}
        <div className="md:col-span-9 md:col-start-4">
          <LineByLineReveal
            lines={bioLines}
            className="text-xl leading-relaxed text-foreground md:text-2xl"
            baseDelay={0.1}
            stagger={0.12}
          />

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-6 pt-12 md:mt-12 md:gap-8 md:pt-16">
            {stats.map((stat, i) => (
              <div key={stat.label}>
                {/* Number — curtain reveal */}
                <Reveal
                  className="font-heading tracking-tight text-foreground"
                  delay={0.55 + i * 0.1}
                >
                  <span className="text-5xl md:text-7xl">{stat.value}</span>
                  <sup className="relative -top-8 ml-0.5 text-xl font-semibold md:-top-9 md:text-2xl">
                    +
                  </sup>
                </Reveal>

                {/* Label — fade in after curtain */}
                <motion.span
                  className="mt-2 block text-xs font-normal uppercase tracking-[0.1em] text-muted-foreground font-label"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.75 + i * 0.1,
                    ease: "easeOut",
                  }}
                >
                  {stat.label}
                </motion.span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image row — full width, 4 columns, scroll-driven height growth */}
      <div
        ref={imageRowRef}
        className="mt-16 grid grid-cols-2 items-end gap-2 md:mt-24 md:grid-cols-4 md:gap-4"
      >
        {aboutImages.map((img, i) => (
          <ImageCard
            key={img.src}
            img={img}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
