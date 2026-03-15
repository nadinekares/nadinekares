"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#service" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Imprint", href: "/imprint" },
];

export function Footer() {
  const textRef = useRef<HTMLSpanElement>(null);

  const fitText = useCallback(() => {
    const el = textRef.current;
    if (!el) return;

    const computed = getComputedStyle(el);
    const padL = parseFloat(computed.paddingLeft) || 0;
    const padR = parseFloat(computed.paddingRight) || 0;
    const availableWidth = window.innerWidth - padL - padR;

    el.style.fontSize = "100px";
    el.style.display = "inline";
    el.style.position = "static";
    el.style.paddingLeft = "0";
    el.style.paddingRight = "0";
    const textWidth = el.getBoundingClientRect().width;
    el.style.display = "";
    el.style.position = "";
    el.style.paddingLeft = "";
    el.style.paddingRight = "";

    const scale = availableWidth / textWidth;
    el.style.fontSize = `${100 * scale}px`;
  }, []);

  useEffect(() => {
    fitText();
    window.addEventListener("resize", fitText);
    return () => window.removeEventListener("resize", fitText);
  }, [fitText]);

  return (
    <footer className="relative w-full bg-black text-white">
      {/* Upper footer content */}
      <div className="px-6 pt-16 pb-12 md:px-10 md:pt-24 md:pb-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Column 1: Quote */}
          <div className="md:col-span-1">
            <p className="text-lg leading-snug text-white/70 md:text-xl">
              &ldquo;Good design is obvious.<br />
              Great design is transparent.&rdquo;
            </p>
            <p className="mt-3 text-xs font-label uppercase tracking-[0.1em] text-white/40">
              — Joe Sparano
            </p>
          </div>

          {/* Column 2: Pages */}
          <div>
            <p className="text-sm font-label uppercase tracking-[0.1em] text-white/50">
              Pages
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get in touch */}
          <div>
            <p className="text-sm font-label uppercase tracking-[0.1em] text-white/50">
              Get in Touch
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <a
                  href="mailto:hello@nadinekares.com"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  hello@nadinekares.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/nadinekares"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/nadinekares"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Full-width name */}
      <span
        ref={textRef}
        className="block w-full whitespace-nowrap px-6 font-heading leading-[0.8] tracking-tight text-white md:px-10"
        style={{ textIndent: "-0.07em" }}
      >
        Nadine Kares
      </span>

      {/* Bottom bar: copyright & legal */}
      <div className="px-6 py-4 md:px-10">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Nadine Kares. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-white/40 transition-colors hover:text-white/70"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
