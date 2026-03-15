"use client";

import { notFound } from "next/navigation";

export default function ArchivePage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background p-8 md:p-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <div className="mb-2 inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Dev Only
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Archive
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Unused sections saved for later. This page is only available in
            development.
          </p>
        </div>

        <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
          <p className="text-muted-foreground">
            Move unused sections here to keep them available without cluttering
            the main site.
          </p>
        </div>
      </div>
    </main>
  );
}
