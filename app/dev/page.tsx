"use client";

import { notFound, useSearchParams } from "next/navigation";
import { Suspense, type ComponentType } from "react";

import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";

/* ── Section registry ─────────────────────────────────────────────── */

const sections: Record<string, { label: string; component: ComponentType }> = {
  hero: { label: "Hero", component: Hero },
  about: { label: "About", component: About },
  // Add new sections here as they're created:
  // features: { label: "Features", component: Features },
  // faq:      { label: "FAQ",      component: FAQ },
};

/* ── Inner component (reads searchParams) ─────────────────────────── */

function DevInner() {
  const params = useSearchParams();
  const sectionKey = params.get("section");

  /* No ?section → show index of available sections */
  if (!sectionKey) {
    return (
      <div className="mx-auto max-w-3xl px-8 py-16">
        <div className="mb-1 inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          Dev Only
        </div>
        <h1 className="mt-3 font-heading text-2xl font-bold tracking-tight text-foreground">
          Section Preview
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Render any section in isolation for faster development.
        </p>
        <ul className="mt-8 space-y-3">
          {Object.entries(sections).map(([key, { label }]) => (
            <li key={key}>
              <a
                href={`/dev?section=${key}`}
                className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80"
              >
                /dev?section={key}
              </a>
              <span className="ml-3 text-sm text-muted-foreground">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /* Unknown section key */
  const entry = sections[sectionKey];
  if (!entry) {
    return (
      <div className="mx-auto max-w-3xl px-8 py-16">
        <p className="text-sm text-destructive">
          Unknown section: <code>{sectionKey}</code>
        </p>
        <a
          href="/dev"
          className="mt-4 inline-block text-sm text-primary underline underline-offset-4"
        >
          View available sections
        </a>
      </div>
    );
  }

  /* Render the requested section */
  const Section = entry.component;
  return (
    <>
      <div className="border-b border-border bg-background px-8 py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <div className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Dev Only
          </div>
          <span className="font-heading text-sm font-medium text-foreground">{entry.label}</span>
          <a
            href="/dev"
            className="ml-auto text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            All sections
          </a>
        </div>
      </div>
      <Section />
    </>
  );
}

/* ── Page wrapper ─────────────────────────────────────────────────── */

export default function DevPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <main className="bg-background">
      <Suspense>
        <DevInner />
      </Suspense>
    </main>
  );
}
