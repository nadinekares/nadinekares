"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";

export function Hero() {
  const textRef = useRef<HTMLHeadingElement>(null);

  const fitText = useCallback(() => {
    const el = textRef.current;
    if (!el) return;

    // Temporarily make inline to measure natural text width
    el.style.fontSize = "100px";
    el.style.display = "inline";
    el.style.position = "static";
    const textWidth = el.getBoundingClientRect().width;
    el.style.display = "";
    el.style.position = "";

    // Scale font so text fills viewport width exactly
    const scale = window.innerWidth / textWidth;
    el.style.fontSize = `${100 * scale}px`;
  }, []);

  useEffect(() => {
    fitText();
    window.addEventListener("resize", fitText);
    return () => window.removeEventListener("resize", fitText);
  }, [fitText]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/images/Nadine Kares_Portrait.jpg"
        alt="Nadine Kares portrait"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <h1
        ref={textRef}
        className="absolute inset-x-0 bottom-0 w-full whitespace-nowrap font-heading leading-[0.8] tracking-tight text-primary-foreground"
      >
        Nadine Kares
      </h1>
    </section>
  );
}
