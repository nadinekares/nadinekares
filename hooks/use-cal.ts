"use client";

import { useEffect, useState } from "react";
import { getCalApi } from "@calcom/embed-react";

let calInitialized = false;

export const calEventTypes = [
  {
    slug: "nadine-kares-design/15min",
    title: "15-Min Projekt-Check",
    duration: "15 min",
    description: "Kostenlos — Eckpunkte deines Projekts klären.",
  },
  {
    slug: "nadine-kares-design/website-audit-30-min",
    title: "30-Min Website-Audit",
    duration: "30 min",
    description: "Kostenlos — Deine Website unter die Lupe nehmen.",
  },
  {
    slug: "nadine-kares-design/30min",
    title: "45-Min Deep-Dive",
    duration: "45 min",
    description: "Für bestehende Kunden — Ausführliche Besprechung.",
  },
];

export function useCal() {
  useEffect(() => {
    if (calInitialized) return;
    calInitialized = true;

    (async () => {
      const cal = await getCalApi({ namespace: "nadine" });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#D4421A" },
          dark: { "cal-brand": "#D4421A" },
        },
        hideEventTypeDetails: false,
      });
    })();
  }, []);
}

export function useCalPicker() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-cal-picker", handler);
    return () => window.removeEventListener("open-cal-picker", handler);
  }, []);

  return { open, onClose: () => setOpen(false) };
}

export function openCalPicker() {
  window.dispatchEvent(new Event("open-cal-picker"));
}

export async function openCalEvent(slug: string) {
  const cal = await getCalApi({ namespace: "nadine" });
  cal("modal", {
    calLink: slug,
    config: { layout: "month_view" },
  });
}
