"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Service", href: "#service" },
  { label: "Portfolio", href: "#portfolio" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-5 md:px-10">
        {/* Logo — left */}
        <Link
          href="/"
          className="relative z-50 text-primary-foreground"
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
                className="text-xs font-semibold tracking-[0.15em] uppercase font-copy text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Contact — right (desktop) */}
        <Link
          href="#contact"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "hidden text-xs font-semibold tracking-[0.15em] uppercase font-copy md:inline-flex",
          )}
        >
          Contact
        </Link>

        {/* Hamburger — right (mobile) */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span
            className={`block h-[1.5px] w-5 bg-primary-foreground transition-all duration-300 ${
              isOpen ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-primary-foreground transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-primary-foreground transition-all duration-300 ${
              isOpen ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
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
                    className="text-2xl font-semibold tracking-[0.1em] uppercase font-copy text-primary-foreground"
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
