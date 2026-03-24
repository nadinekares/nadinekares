"use client";

import Link from "next/link";
import { useFitText } from "@/hooks/use-fit-text";
import { openCalPicker } from "@/hooks/use-cal";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#projects" },
  { label: "Contact", href: "#cal", isCal: true },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Imprint", href: "/imprint" },
];

export function Footer() {
  const textRef = useFitText<HTMLSpanElement>();

  return (
    <footer className="relative w-full bg-black text-white">
      {/* Upper footer content */}
      <div className="px-6 pt-16 pb-12 md:px-10 md:pt-24 md:pb-16">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          {/* Left: Quote */}
          <div>
            <p className="text-lg leading-snug text-white/70 md:text-xl">
              Catching clicks,
              <br />
              crafting pixels.
            </p>
          </div>

          {/* Right: Pages + Get in Touch */}
          <div className="flex gap-16 sm:gap-20 md:gap-28 lg:gap-36">
            {/* Pages */}
            <div>
              <p className="text-sm font-label uppercase tracking-[0.1em] text-white/50">Pages</p>
              <ul className="mt-3 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    {"isCal" in link && link.isCal ? (
                      <button
                        onClick={() => openCalPicker()}
                        className="text-sm text-white/70 transition-colors hover:text-white cursor-pointer"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Get in Touch */}
            <div>
              <p className="text-sm font-label uppercase tracking-[0.1em] text-white/50">
                Get in Touch
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                <li>
                  <a
                    href="mailto:design@nadinekares.at"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    design@nadinekares.at
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/piz_nadjini/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/nadine-brantschen/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://soundcloud.com/piznadjini"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    SoundCloud
                  </a>
                </li>
              </ul>
            </div>
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
