"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { useIntroPhase } from "@/components/intro-provider";

const LENS_SIZE_VW = 18;
const HERO_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAKABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIDBP/EAB4QAAICAgIDAAAAAAAAAAAAAAERAgMABCExUWGx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AM9VUbHEB8hrxiWwjXWYyYlygsOqSBJE9jJbxdgfv7gf/9k=";

function useLensEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    setEnabled(mq.matches);
    const handler = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return enabled;
}

/* ── Crosshair SVG (reused in viewfinder + lens) ── */
function Crosshair({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`text-primary-foreground ${className}`}
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
  );
}

export function Hero() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const lensImgRef = useRef<HTMLDivElement>(null);
  const [lensVisible, setLensVisible] = useState(false);
  const [mouseActive, setMouseActive] = useState(false);
  const mouseActiveRef = useRef(false);
  const lensEnabled = useLensEnabled();
  const phase = useIntroPhase();

  const introDone = phase === "done";
  const showUI = phase === "reveal" || phase === "done";

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

  /* ── Lens cursor logic (only after intro done) ── */
  useEffect(() => {
    if (!lensEnabled || !introDone) return;

    const section = sectionRef.current;
    const lens = lensRef.current;
    const lensImg = lensImgRef.current;
    if (!section || !lens || !lensImg) return;

    // Pre-position the lens at center (invisible until mouse moves)
    const rect = section.getBoundingClientRect();
    const lensW = lens.offsetWidth;
    const lensH = lens.offsetHeight;
    const centerX = rect.width / 2 - lensW / 2;
    const centerY = rect.height / 2 - lensH / 2;

    const target = { x: centerX, y: centerY };
    const current = { x: centerX, y: centerY };

    lens.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
    lensImg.style.transform = `translate3d(${-current.x}px, ${-current.y}px, 0)`;

    let rafId: number;
    let isAnimating = false;
    const ease = 0.1;

    function tick() {
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;

      lens.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      lensImg.style.transform = `translate3d(${-current.x}px, ${-current.y}px, 0)`;

      if (
        Math.abs(target.x - current.x) > 0.1 ||
        Math.abs(target.y - current.y) > 0.1
      ) {
        rafId = requestAnimationFrame(tick);
      } else {
        isAnimating = false;
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const sectionRect = section.getBoundingClientRect();
      const x = e.clientX - sectionRect.left;
      const y = e.clientY - sectionRect.top;

      const w = lens.offsetWidth;
      const h = lens.offsetHeight;
      target.x = x - w / 2;
      target.y = y - h / 2;

      // First mouse movement: activate lens + hide static viewfinder
      // Both state updates are batched → single re-render → no flash
      if (!mouseActiveRef.current) {
        mouseActiveRef.current = true;
        setMouseActive(true);
        setLensVisible(true);
      }

      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      // Re-entering after having left: snap to entry position
      if (mouseActiveRef.current) {
        const sectionRect = section.getBoundingClientRect();
        const x = e.clientX - sectionRect.left;
        const y = e.clientY - sectionRect.top;
        const w = lens.offsetWidth;
        const h = lens.offsetHeight;
        current.x = x - w / 2;
        current.y = y - h / 2;
        target.x = current.x;
        target.y = current.y;

        lens.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
        lensImg.style.transform = `translate3d(${-current.x}px, ${-current.y}px, 0)`;
      }
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
  }, [lensEnabled, introDone]);

  // Whether to show blur on the background (during/after viewfinder phase on desktop)
  const showBlur = lensEnabled && phase !== "image";

  // Viewfinder clip-path: full screen → centered square
  const viewfinderTarget = `inset(calc(50% - ${LENS_SIZE_VW / 2}vw) calc(50% - ${LENS_SIZE_VW / 2}vw))`;
  const getClipPath = () => {
    if (phase === "image") return "inset(0% 0% 0% 0%)";
    // Stay at centered square for "done" — opacity handles the fade-out
    // so there's a seamless handoff to the interactive lens at the same position
    return viewfinderTarget;
  };

  // Viewfinder border position
  const getBorderInset = () => {
    if (phase === "image")
      return { top: "0%", left: "0%", right: "0%", bottom: "0%" };
    return {
      top: `calc(50% - ${LENS_SIZE_VW / 2}vw)`,
      left: `calc(50% - ${LENS_SIZE_VW / 2}vw)`,
      right: `calc(50% - ${LENS_SIZE_VW / 2}vw)`,
      bottom: `calc(50% - ${LENS_SIZE_VW / 2}vw)`,
    };
  };

  const borderInset = getBorderInset();
  const showViewfinder =
    phase === "viewfinder" ||
    phase === "reveal" ||
    (phase === "done" && !mouseActive);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ cursor: "auto" }}
    >
      {/* ── Layer 1: Background image (blurred on desktop after phase 1) ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Nadine Kares_Portrait.jpg"
          alt={lensEnabled ? "" : "Nadine Kares portrait"}
          fill
          priority
          className={`object-cover scale-[1.03] transition-[filter] duration-[1400ms] ease-out ${
            showBlur ? "blur-[10px]" : ""
          }`}
          sizes="100vw"
          quality={80}
          placeholder="blur"
          blurDataURL={HERO_BLUR_DATA_URL}
          aria-hidden={lensEnabled}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* ── Layer 2: Sharp image with clip-path (viewfinder effect — desktop) ── */}
      {lensEnabled && (
        <div
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            clipPath: getClipPath(),
            opacity: mouseActive ? 0 : 1,
            transitionProperty: "clip-path, opacity",
            transitionDuration: "1.4s, 0.5s",
            transitionTimingFunction:
              "cubic-bezier(0.25, 0.1, 0.25, 1), ease-out",
          }}
        >
          <Image
            src="/images/Nadine Kares_Portrait.jpg"
            alt=""
            fill
            priority
            className="object-cover scale-[1.03]"
            sizes="100vw"
            quality={80}
            aria-hidden
          />
        </div>
      )}

      {/* ── Layer 3: Viewfinder border frame (desktop) ── */}
      {lensEnabled && (
        <div
          className="pointer-events-none absolute inset-0 z-[15]"
          style={{
            opacity: showViewfinder ? 1 : 0,
            transitionProperty: "opacity",
            transitionDuration: "0.3s",
            transitionTimingFunction: "ease",
          }}
        >
          {/* Border frame */}
          <div
            className="absolute border border-primary-foreground/40"
            style={{
              ...borderInset,
              transitionProperty: "all",
              transitionDuration: "1.4s",
              transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          />
          {/* Crosshair centered */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: showViewfinder ? 1 : 0,
              transitionProperty: "opacity",
              transitionDuration: "0.4s",
              transitionTimingFunction: "ease",
            }}
          >
            <Crosshair />
          </div>
        </div>
      )}

      {/* ── Layer 4: Sharp lens that follows cursor — desktop only ── */}
      {/* Always mounted (when lensEnabled) so the image is pre-loaded;
          opacity controlled by lensVisible which activates after intro */}
      {lensEnabled && (
        <div
          ref={lensRef}
          className="pointer-events-none absolute left-0 top-0 z-[5] overflow-hidden border border-primary-foreground/40"
          style={{
            width: `${LENS_SIZE_VW}vw`,
            height: `${LENS_SIZE_VW}vw`,
            opacity: lensVisible ? 1 : 0,
            transitionProperty: "opacity",
            transitionDuration: "0.3s",
            transitionTimingFunction: "ease",
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
              loading="eager"
              className="object-cover scale-[1.03]"
              sizes="100vw"
              quality={80}
            />
          </div>
          <Crosshair className="absolute inset-0 m-auto" />
        </div>
      )}

      {/* ── Text labels ── */}
      <div
        className="absolute inset-x-0 z-10 flex w-full justify-between px-6 font-semibold tracking-[0.15em] uppercase font-heading text-primary-foreground md:px-10"
        style={{ top: "50%", fontSize: "clamp(0.625rem, 1.1vw, 1rem)" }}
      >
        {["Brands", "Websites", "Design", "Vienna / Zurich"].map(
          (label, i) => (
            <span
              key={label}
              style={{
                opacity: showUI ? 1 : 0,
                transform: showUI ? "translateY(0)" : "translateY(12px)",
                transitionProperty: "opacity, transform",
                transitionDuration: "0.6s",
                transitionTimingFunction: "ease-out",
                transitionDelay: showUI ? `${i * 100}ms` : "0ms",
              }}
            >
              {label}
            </span>
          ),
        )}
      </div>

      {/* ── Name overlay ── */}
      <h1
        ref={textRef}
        className="absolute inset-x-0 bottom-0 z-10 w-full whitespace-nowrap font-heading leading-[0.8] tracking-tight text-primary-foreground"
        style={{
          opacity: showUI ? 1 : 0,
          transform: showUI ? "translateY(0)" : "translateY(40px)",
          transitionProperty: "opacity, transform",
          transitionDuration: "0.8s",
          transitionTimingFunction: "ease-out",
          transitionDelay: showUI ? "300ms" : "0ms",
        }}
      >
        Nadine Kares
      </h1>
    </section>
  );
}
