"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/lib/projects";
import { Reveal } from "@/components/ui/reveal";

/* ─── Logo Marquee ────────────────────────────────────────── */

function LogoMarquee({ title }: { title: string }) {
  const items = Array.from({ length: 8 });

  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-8 md:pt-32 md:pb-12">
      {/* Back link */}
      <div className="absolute left-6 top-6 z-10 md:left-10 md:top-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-normal uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground font-label"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="rotate-180"
          >
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </Link>
      </div>

      {/* Marquee */}
      <div className="pointer-events-none flex select-none whitespace-nowrap">
        <motion.div
          className="flex shrink-0 will-change-transform"
          animate={{ x: "-50%" }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 80,
              ease: "linear",
            },
          }}
        >
          {items.map((_, i) => (
            <span
              key={i}
              className="mx-4 font-heading text-[3.5rem] leading-none tracking-tight text-foreground sm:text-[5rem] md:mx-12 md:text-[12rem] lg:text-[16rem]"
            >
              {title}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Parallax Image Card ─────────────────────────────────── */

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Inner image: parallax shift
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div
      ref={ref}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-sm"
    >
      <motion.div className="absolute inset-[-20%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 55vw"
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Image Scroll Column ─────────────────────────────────── */

function ImageScroll({ images, title }: { images: string[]; title: string }) {
  return (
    <div className="flex flex-col gap-2 md:gap-3">
      {images.map((src, i) => (
        <ParallaxImage key={src} src={src} alt={`${title} — ${i + 1}`} />
      ))}
    </div>
  );
}

/* ─── Project Detail ──────────────────────────────────────── */

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="bg-background">
      {/* Section 1 — Header Marquee */}
      <LogoMarquee title={project.title} />

      {/* Section 2 — Content: Left info + Right image scroll */}
      <section className="px-6 pt-8 pb-16 md:px-10 md:pt-12 md:pb-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Left column — sticky info */}
          <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
            {/* Stats */}
            <div className="space-y-4">
              {project.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={0.05 * (i + 1)}>
                  <div className="flex justify-between">
                    <span className="text-xs font-normal uppercase tracking-[0.1em] text-muted-foreground font-label shrink-0">
                      {stat.label}
                    </span>
                    <span className="text-sm text-foreground text-right pl-6">
                      {stat.value}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Description */}
            <Reveal delay={0.3}>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </Reveal>
          </div>

          {/* Right column — scrolling images */}
          <div className="md:col-span-7 md:col-start-6">
            <ImageScroll images={project.images} title={project.title} />
          </div>
        </div>
      </section>
    </main>
  );
}
