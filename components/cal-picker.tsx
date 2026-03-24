"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { calEventTypes, openCalEvent } from "@/hooks/use-cal";

export function CalPicker({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const handleSelect = useCallback(
    (slug: string) => {
      onClose();
      openCalEvent(slug);
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md px-6"
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-white">
                Book a Call
              </h3>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Event type cards */}
            <div className="flex flex-col gap-3">
              {calEventTypes.map((event, i) => (
                <motion.button
                  key={event.slug}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.25 }}
                  onClick={() => handleSelect(event.slug)}
                  className="group w-full cursor-pointer rounded-xl border border-white/15 bg-white/10 p-5 text-left transition-all hover:border-white/30 hover:bg-white/15"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-label text-sm font-normal tracking-wide text-white">
                        {event.title}
                      </p>
                      <p className="mt-1 text-sm text-white/50">
                        {event.description}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-xs font-label text-white/70">
                      {event.duration}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Email fallback */}
            <motion.a
              href="mailto:design@nadinekares.at"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.25 }}
              onClick={() => setTimeout(onClose, 100)}
              className="mt-4 block w-full text-center text-sm text-white/40 transition-colors hover:text-white/70"
            >
              Write an email instead
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
