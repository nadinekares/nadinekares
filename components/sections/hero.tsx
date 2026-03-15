"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";

const LENS_SIZE_VW = 18;

function useLensEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop with a fine pointer (excludes mobile + tablets)
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    setEnabled(mq.matches);
    const handler = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return enabled;
}

export function Hero() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const lensImgRef = useRef<HTMLDivElement>(null);
  const [lensVisible, setLensVisible] = useState(false);
  const lensEnabled = useLensEnabled();

  const fitText = useCallback(() => {
    const el = textRef.current;
    if (!el) return;

    el.style.fontSize = "100px";
    el.style.display = "inline";
    el.style.position = "static";
    const textWidth = el.getBoundingClientRect().width;
    el.style.display = "";
    el.style.position = "";

    const scale = window.innerWidth / textWidth;
    el.style.fontSize = `${100 * scale}px`;
  }, []);

  useEffect(() => {
    fitText();
    window.addEventListener("resize", fitText);
    return () => window.removeEventListener("resize", fitText);
  }, [fitText]);

  useEffect(() => {
    if (!lensEnabled) return;

    const section = sectionRef.current;
    const lens = lensRef.current;
    const lensImg = lensImgRef.current;
    if (!section || !lens || !lensImg) return;

    // Target position (where cursor is) and current position (where lens is)
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let rafId: number;
    let isAnimating = false;
    const ease = 0.1; // lower = more delay (0.08–0.15 feels smooth)

    function tick() {
      // Lerp toward target
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;

      lens.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      lensImg.style.transform = `translate3d(${-current.x}px, ${-current.y}px, 0)`;

      // Keep animating while there's meaningful distance
      if (Math.abs(target.x - current.x) > 0.1 || Math.abs(target.y - current.y) > 0.1) {
        rafId = requestAnimationFrame(tick);
      } else {
        isAnimating = false;
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const lensW = lens.offsetWidth;
      const lensH = lens.offsetHeight;
      target.x = x - lensW / 2;
      target.y = y - lensH / 2;

      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      // Snap to initial position so lens doesn't animate in from corner
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const lensW = lens.offsetWidth;
      const lensH = lens.offsetHeight;
      current.x = x - lensW / 2;
      current.y = y - lensH / 2;
      target.x = current.x;
      target.y = current.y;

      lens.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      lensImg.style.transform = `translate3d(${-current.x}px, ${-current.y}px, 0)`;
      setLensVisible(true);
    };

    const handleMouseLeave = () => setLensVisible(false);

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [lensEnabled]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ cursor: "auto" }}
    >
      {/* Background image — blurred on desktop, sharp on mobile */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Nadine Kares_Portrait.jpg"
          alt={lensEnabled ? "" : "Nadine Kares portrait"}
          fill
          priority
          className={`object-cover ${lensEnabled ? "blur-[10px] scale-[1.03]" : ""}`}
          sizes="100vw"
          aria-hidden={lensEnabled}
        />
      </div>

      {/* Sharp lens that follows cursor — desktop only */}
      {lensEnabled && (
        <div
          ref={lensRef}
          className="pointer-events-none absolute left-0 top-0 z-[5] overflow-hidden border border-primary-foreground/40 transition-opacity duration-300"
          style={{
            width: `${LENS_SIZE_VW}vw`,
            height: `${LENS_SIZE_VW}vw`,
            opacity: lensVisible ? 1 : 0,
            willChange: "transform",
          }}
        >
          <div
            ref={lensImgRef}
            className="absolute left-0 top-0 h-screen w-screen"
            style={{ willChange: "transform" }}
          >
            <Image
              src="/images/Nadine Kares_Portrait.jpg"
              alt="Nadine Kares portrait"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          {/* Crosshair */}
          <svg
            className="absolute inset-0 m-auto text-primary-foreground"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.286 12H17.714M12 6.286V17.714"
              stroke="currentColor"
              strokeWidth="1.14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Text labels */}
      <div
        className="absolute inset-x-0 z-10 flex w-full justify-between px-6 font-semibold tracking-[0.15em] uppercase font-heading text-primary-foreground md:px-10"
        style={{ top: "35vh", fontSize: "clamp(0.625rem, 1.1vw, 1rem)" }}
      >
        <span>Brands</span>
        <span>Websites</span>
        <span>Design</span>
        <span>Vienna / Zurich</span>
      </div>

      {/* Name overlay */}
      <h1
        ref={textRef}
        className="absolute inset-x-0 bottom-0 z-10 w-full whitespace-nowrap font-heading leading-[0.8] tracking-tight text-primary-foreground"
      >
        Nadine Kares
      </h1>
    </section>
  );
}
