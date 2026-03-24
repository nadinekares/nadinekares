"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { type MotionValue, motion, useInView, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/ui/reveal";

const stats = [
  { value: "10", label: "Years of Experience" },
  { value: "50", label: "Projects" },
  { value: "30", label: "Clients" },
];

const bioText =
  "I'm a designer specializing in brand identity and web design. Based between Vienna and Zurich, I craft distinctive visual experiences that connect brands with their audience — with precision, clarity, and a sharp eye for detail.";

const aboutImages = [
  {
    src: "/images/Nadine Kares_about-image-01.jpg",
    alt: "Studio work — brand identity",
    ratio: 3 / 4,
    logo: "/images/Logo_Talentir.svg",
    logoClass: "h-5 md:h-6",
    href: "https://www.talentir.com",
  },
  {
    src: "/images/Nadine Kares_about-image-02.jpeg",
    alt: "Studio work — web design",
    ratio: 3 / 2.8,
    logo: "/images/Logo_Hotelpartner.svg",
    logoClass: "h-10 md:h-12",
    href: "https://hotelpartner.com/de/b-e-quick/",
  },
  {
    src: "/images/Nadine Kares_about-image-03.jpeg",
    alt: "Studio work — visual direction",
    ratio: 3 / 2,
    logo: "/images/Logo_Janet Brantschen.svg",
    logoClass: "h-5 md:h-6 max-w-[65%]",
    href: "https://www.janetbrantschen.com",
  },
  {
    src: "/images/Nadine Kares_about-image-04.jpeg",
    alt: "Studio work — creative process",
    ratio: 3 / 1.4,
    logo: "/images/Logo_Bluecode.svg",
    logoClass: "h-7 md:h-9",
    href: "https://www.bluecode.com",
  },
];

function WordByWordReveal({
  text,
  className,
  baseDelay = 0,
  stagger = 0.02,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-clip align-top">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : { y: "100%" }}
            transition={{
              duration: 0.8,
              delay: baseDelay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </p>
  );
}

const TARGET_RATIO = aboutImages[0].ratio; // 3/4 — tallest image

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

function ImageCard({
  img,
  index,
  scrollYProgress,
}: {
  img: (typeof aboutImages)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const isDesktop = useIsDesktop();

  // Desktop: scroll-driven staggered height animation
  const endRatio = index === 0 ? img.ratio : img.ratio + (TARGET_RATIO - img.ratio) * 0.85;
  const animatedRatio = useTransform(scrollYProgress, [0, 1], [img.ratio, endRatio]);

  // Mobile (2x2 grid): fixed uniform ratio, no animation
  const MOBILE_RATIO = 3 / 4;

  return (
    <motion.a
      href={img.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden bg-muted cursor-pointer"
      style={{ aspectRatio: isDesktop ? animatedRatio : MOBILE_RATIO }}
      initial={{ opacity: 0, y: isDesktop ? 24 : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: isDesktop ? index * 0.1 : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Image wrapper — sized to final ratio so the container only reveals (no zoom) */}
      <div
        className="absolute inset-x-0 bottom-0 w-full"
        style={{ aspectRatio: isDesktop ? endRatio : MOBILE_RATIO }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover transition-[filter] duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:blur-[3px] group-hover:animate-slow-zoom"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      {/* Dark overlay on hover */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-[background] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:bg-black/30" />

      {/* Brand logo overlay — fades in on hover */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
        <Image
          src={img.logo}
          alt={img.alt.replace("Studio work — ", "") + " logo"}
          width={160}
          height={48}
          className={`relative z-10 w-auto max-w-[60%] brightness-0 invert drop-shadow-lg ${img.logoClass}`}
        />
      </div>
    </motion.a>
  );
}

export function About() {
  const imageRowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRowRef,
    offset: ["start 0.75", "start 0.2"],
  });

  return (
    <section id="about" className="relative bg-background px-6 py-24 md:px-10 md:py-32">
      <div className="md:grid md:grid-cols-12 md:gap-8">
        {/* Left — tag */}
        <Reveal
          className="mb-8 text-xs font-normal uppercase tracking-[0.1em] text-muted-foreground font-label md:col-span-3 md:mb-0"
          delay={0}
          margin="-10%"
          duration={1}
          ease={[0.22, 1, 0.36, 1]}
        >
          About
        </Reveal>

        {/* Right — bio + stats */}
        <div className="md:col-span-9 md:col-start-4">
          <WordByWordReveal
            text={bioText}
            className="text-xl leading-relaxed text-foreground md:text-2xl"
            baseDelay={0.1}
            stagger={0.02}
          />

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-6 pt-12 md:mt-12 md:gap-8 md:pt-16">
            {stats.map((stat, i) => (
              <div key={stat.label}>
                {/* Number — mask reveal */}
                <Reveal
                  className="font-heading tracking-tight text-foreground"
                  delay={0.2 + i * 0.15}
                  margin="-10%"
                  duration={1}
                  ease={[0.22, 1, 0.36, 1]}
                  overflowAfter
                >
                  <span className="inline-flex items-start">
                    <span className="text-5xl md:text-7xl">{stat.value}</span>
                    <span className="ml-0.5 mt-0.5 text-xl font-semibold md:text-2xl">+</span>
                  </span>
                </Reveal>

                {/* Label — fade in after number */}
                <motion.span
                  className="mt-2 block text-xs font-normal uppercase tracking-[0.1em] text-muted-foreground font-label"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: 0.4 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
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
        className="relative mt-16 grid grid-cols-2 items-start gap-2 md:mt-24 md:grid-cols-4 md:items-end md:gap-4"
      >
        {aboutImages.map((img, i) => (
          <ImageCard key={img.src} img={img} index={i} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
