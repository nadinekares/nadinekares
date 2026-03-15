"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { useIntroPhase } from "@/components/intro-provider";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#projects" },
];

/** Section IDs that have a white / light background. */
const LIGHT_SECTIONS = ["about", "services", "projects"];

function useNavTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const navBottom = 80; // approximate nav height in px
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
  }, []);

  return isDark;
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const phase = useIntroPhase();
  const showNav = phase === "reveal" || phase === "done";
  const isDark = useNavTheme();

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        opacity: showNav ? 1 : 0,
        transform: showNav ? "translateY(0)" : "translateY(-20px)",
        transitionProperty: "opacity, transform",
        transitionDuration: "0.7s",
        transitionTimingFunction: "ease-out",
      }}
    >
      <nav className="flex items-center justify-between px-6 py-5 md:px-10">
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
          nativeButton={false}
          className="hidden text-xs md:inline-flex"
          render={<Link href="#contact" />}
        >
          Contact
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-primary md:hidden"
          >
            {[...navLinks, { label: "Contact", href: "#contact" }].map(
              (link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-normal tracking-[0.1em] uppercase font-label text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
