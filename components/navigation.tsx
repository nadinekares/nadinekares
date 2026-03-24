"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { useIntroPhase } from "@/components/intro-provider";
import { openCalPicker } from "@/hooks/use-cal";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#projects" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/piz_nadjini/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nadine-brantschen/" },
  { label: "SoundCloud", href: "https://soundcloud.com/piznadjini" },
];

/** Section IDs that have a white / light background. */
const LIGHT_SECTIONS = ["about", "services", "projects"];

function useNavTheme(introReady: boolean) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Keep the white-on-dark nav until the intro animation is done
    if (!introReady) return;

    const onScroll = () => {
      const navBottom = 80; // approximate nav height in px

      // On pages without light sections (e.g. legal pages), check if body background is light
      const hasLightSections = LIGHT_SECTIONS.some((id) => document.getElementById(id));

      if (!hasLightSections) {
        // Legal/subpages have a white background — always use dark nav
        setIsDark(true);
        return;
      }

      let overLight = false;

      for (const id of LIGHT_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // nav overlaps this section if section top is above navBottom and section bottom is below 0
        if (rect.top < navBottom && rect.bottom > 0) {
          overLight = true;
          break;
        }
      }

      setIsDark(overLight);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [introReady]);

  return isDark;
}

const SCROLL_THRESHOLD = 10;

function useScrollDirection() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const anchorY = useRef(0);
  const direction = useRef<"up" | "down">("up");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      // Always show nav near the top of the page
      if (y < 100) {
        setHidden(false);
        lastY.current = y;
        anchorY.current = y;
        direction.current = "up";
        return;
      }

      const diff = y - lastY.current;
      lastY.current = y;

      // Ignore zero-movement events
      if (diff === 0) return;

      const newDir = diff > 0 ? "down" : "up";

      // When direction reverses, reset the anchor point
      if (newDir !== direction.current) {
        direction.current = newDir;
        anchorY.current = y;
      }

      const delta = Math.abs(y - anchorY.current);

      // Only toggle visibility after exceeding threshold
      if (delta > SCROLL_THRESHOLD) {
        setHidden(newDir === "down");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 top-0 z-40 flex h-dvh w-screen flex-col items-center justify-center gap-8 bg-primary md:hidden"
        >
          {[
            ...navLinks,
            { label: "Contact", href: "#cal", isCal: true },
          ].map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
            >
              {"isCal" in link && link.isCal ? (
                <button
                  onClick={() => {
                    onClose();
                    openCalPicker();
                  }}
                  className="text-2xl font-normal tracking-[0.1em] uppercase font-label text-primary-foreground"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="text-2xl font-normal tracking-[0.1em] uppercase font-label text-primary-foreground"
                >
                  {link.label}
                </Link>
              )}
            </motion.div>
          ))}
          <div className="mt-8 flex gap-6 border-t border-primary-foreground/20 pt-8">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const phase = useIntroPhase();
  const showNav = phase === "reveal" || phase === "done";
  const introDone = phase === "done";
  const isDark = useNavTheme(introDone);
  const scrollHidden = useScrollDirection();
  const hideNav = introDone && scrollHidden && !isOpen;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        opacity: showNav ? 1 : 0,
        transform: !showNav ? "translateY(-20px)" : hideNav ? "translateY(-100%)" : "translateY(0)",
        transitionProperty: "opacity, transform",
        transitionDuration: hideNav ? "0.4s" : "0.7s",
        transitionTimingFunction: "ease-out",
      }}
    >
      {/* Gradient overlay + blur for readability */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-36 transition-opacity duration-300"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.35) 70%, transparent 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.15) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <nav className="relative flex items-center justify-between px-6 py-5 md:px-10">
        {/* Logo — left */}
        <Link
          href="/"
          className={`relative z-50 transition-colors duration-300 ${
            isDark && !isOpen ? "text-foreground" : "text-primary-foreground"
          }`}
          aria-label="Nadine Kares — Home"
        >
          <svg
            viewBox="0 0 57.42 33.11"
            fill="currentColor"
            className="h-6 w-auto md:h-7"
            aria-hidden="true"
          >
            <polygon points="57.42 13.28 50.24 7.25 41.04 16.62 21.33 0 0 21.74 7.14 27.76 18.22 16.45 37.98 33.11 57.42 13.28" />
          </svg>
        </Link>

        {/* Nav links — center (desktop) */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-xs font-normal tracking-[0.1em] uppercase font-label transition-colors duration-300 ${
                  isDark
                    ? "text-foreground/70 hover:text-foreground"
                    : "text-primary-foreground/80 hover:text-primary-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Contact — right (desktop) */}
        <Button
          variant={isDark ? "outline" : "default"}
          size="sm"
          className={`hidden text-xs md:inline-flex ${
            !isDark
              ? "border-white/80 bg-transparent text-white hover:border-brand hover:bg-brand hover:text-white"
              : "hover:border-brand hover:bg-brand hover:text-white"
          }`}
          onClick={() => openCalPicker()}
        >
          Let&apos;s Chat
        </Button>

        {/* Hamburger — right (mobile) */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span
            className={`block h-[1.5px] w-5 transition-all duration-300 ${
              isDark && !isOpen ? "bg-foreground" : "bg-primary-foreground"
            } ${isOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[1.5px] w-5 transition-all duration-300 ${
              isDark && !isOpen ? "bg-foreground" : "bg-primary-foreground"
            } ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-[1.5px] w-5 transition-all duration-300 ${
              isDark && !isOpen ? "bg-foreground" : "bg-primary-foreground"
            } ${isOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
