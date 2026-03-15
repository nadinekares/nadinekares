"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type IntroPhase = "image" | "viewfinder" | "reveal" | "done";

const IntroContext = createContext<IntroPhase>("image");

export function useIntroPhase() {
  return useContext(IntroContext);
}

/** Timings (ms) — adjust to taste */
const PHASE_TIMINGS: Record<Exclude<IntroPhase, "image">, number> = {
  viewfinder: 800, // sharp image shows alone for 0.8 s
  reveal: 2400, // viewfinder shrinks for ~1.6 s
  done: 3800, // UI staggers in for ~1.4 s
};

export function IntroProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>("image");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase("viewfinder"), PHASE_TIMINGS.viewfinder));
    timers.push(setTimeout(() => setPhase("reveal"), PHASE_TIMINGS.reveal));
    timers.push(setTimeout(() => setPhase("done"), PHASE_TIMINGS.done));

    // Lock scroll during intro
    document.body.style.overflow = "hidden";
    timers.push(
      setTimeout(() => {
        document.body.style.overflow = "";
      }, PHASE_TIMINGS.done),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <IntroContext.Provider value={phase}>{children}</IntroContext.Provider>
  );
}
