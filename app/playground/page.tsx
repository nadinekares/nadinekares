"use client";

import { notFound } from "next/navigation";
import { HeroVariantA } from "@/components/sections/hero-variant-a";
import { HeroVariantB } from "@/components/sections/hero-variant-b";
import { HeroVariantC } from "@/components/sections/hero-variant-c";

export default function PlaygroundPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <main className="bg-background">
      <div className="border-b border-border bg-background px-8 py-6 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-1 inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Dev Only
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Playground</h1>
          <p className="mt-1 text-sm text-muted-foreground">Hero section drafts for Nadine Kares</p>
        </div>
      </div>

      {/* Variant A — Centered Minimal */}
      <div className="border-b border-border">
        <div className="bg-muted/50 px-8 py-4 md:px-16">
          <div className="mx-auto max-w-7xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Variant A — Centered Minimal
            </span>
          </div>
        </div>
        <HeroVariantA />
      </div>

      {/* Variant B — Editorial Split */}
      <div className="border-b border-border">
        <div className="bg-muted/50 px-8 py-4 md:px-16">
          <div className="mx-auto max-w-7xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Variant B — Editorial Split
            </span>
          </div>
        </div>
        <HeroVariantB />
      </div>

      {/* Variant C — Dark Contrast */}
      <div>
        <div className="bg-muted/50 px-8 py-4 md:px-16">
          <div className="mx-auto max-w-7xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Variant C — Dark Contrast
            </span>
          </div>
        </div>
        <HeroVariantC />
      </div>
    </main>
  );
}
