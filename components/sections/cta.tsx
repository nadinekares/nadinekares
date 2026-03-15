"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Cta() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [imageProgress, setImageProgress] = useState(0);
  const [textProgress, setTextProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Phase 1: Image scale — section top goes from windowH (entering) to 0 (top of viewport)
      const vp = 1 - rect.top / windowH;
      setImageProgress(Math.max(0, Math.min(1, vp)));

      // Phase 2: Text animation — after image is full, section top goes from 0 to -windowH
      const tp = -rect.top / windowH;
      setTextProgress(Math.max(0, Math.min(1, tp)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Image: scale 75% → 100%, border-radius 24px → 0
  const scale = 0.75 + imageProgress * 0.25;
  const radius = (1 - imageProgress) * 24;

  // Text: opacity 0 → 1, scale 75% → 100%, translateY from bottom to center
  const textOpacity = textProgress;
  const textScale = 0.75 + textProgress * 0.25;
  const textTranslateY = (1 - textProgress) * 35;

  return (
    <section
      ref={sectionRef}
      className="relative w-screen left-1/2 -translate-x-1/2 h-[200vh]"
      aria-label="Get in Touch"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {/* Image background */}
        <div
          className="absolute inset-0 overflow-hidden will-change-transform"
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${radius}px`,
          }}
        >
          <Image
            src="/images/cta.jpg"
            alt="Get in touch"
            fill
            className="object-cover"
            style={{ filter: `grayscale(${textProgress})` }}
            sizes="100vw"
            priority={false}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: `rgba(0, 0, 0, ${0.4 + textProgress * 0.15})`,
            }}
          />
        </div>

        {/* Text content */}
        <div
          className="relative z-10 text-center flex flex-col items-center gap-[clamp(1.5rem,3vh,2.5rem)] will-change-transform"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}vh) scale(${textScale})`,
          }}
        >
          <h2 className="m-0 font-heading font-semibold text-white text-[clamp(2.5rem,10vw,8.5rem)] leading-[0.95] tracking-[-0.02em]">
            Let&apos;s Work Together.
          </h2>
          <a
            href="mailto:hello@nadinekares.com"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/90 bg-white/10 text-white backdrop-blur-[4px] hover:bg-white hover:text-black"
            )}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
