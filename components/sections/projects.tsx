"use client";

import { type ReactNode, useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";

const projects = [
  {
    title: "Aura Wellness",
    category: "Brand Identity",
    year: "2025",
    image: "/images/projects/project-1.jpg",
  },
  {
    title: "Velta Studio",
    category: "Web Design",
    year: "2025",
    image: "/images/projects/project-2.jpg",
  },
  {
    title: "Maison Noire",
    category: "Creative Direction",
    year: "2024",
    image: "/images/projects/project-3.jpg",
  },
  {
    title: "Solara",
    category: "Identity & Web",
    year: "2024",
    image: "/images/projects/project-4.jpg",
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

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Info */}
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="font-heading text-lg tracking-tight text-foreground md:text-xl">
          {project.title}
        </h3>
        <span className="text-xs font-normal font-label text-muted-foreground">
          {project.year}
        </span>
      </div>
      <p className="mt-1 text-xs font-label uppercase tracking-[0.1em] text-muted-foreground">
        {project.category}
      </p>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="bg-background px-6 py-24 md:px-10 md:py-32">
      {/* Tag + heading row */}
      <div className="md:grid md:grid-cols-12 md:items-start md:gap-8">
        {/* Left — tag */}
        <Reveal
          className="mb-8 text-xs font-normal uppercase tracking-[0.1em] text-muted-foreground font-label md:col-span-3 md:mb-0 md:mt-[8px]"
          delay={0}
        >
          Projects
        </Reveal>

        {/* Right — title */}
        <div className="md:col-span-9 md:col-start-4">
          <Reveal delay={0.1}>
            <h2 className="font-heading text-6xl leading-none tracking-tight text-foreground md:text-8xl">
              Selected work
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Project grid */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
