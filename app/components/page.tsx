"use client";

import { notFound } from "next/navigation";
import {
  componentRegistry,
  getCategories,
  getComponentsByCategory,
} from "@/lib/component-registry";

export default function ComponentsPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const categories = getCategories();
  const isEmpty = componentRegistry.length === 0;

  return (
    <div className="min-h-screen bg-background font-copy">
      {/* Navigation */}
      {!isEmpty && (
        <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center gap-8 overflow-x-auto px-6 py-4">
            <h1 className="shrink-0 text-lg font-bold tracking-tight text-foreground">
              Components
            </h1>
            <div className="flex gap-6 text-sm">
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={`#${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-2 inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Dev Only
          </div>
          {isEmpty && (
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Components</h1>
          )}
          <p className="mt-2 text-lg text-muted-foreground">
            Reusable component library. Edit a component here or on the main site — changes sync
            everywhere.
          </p>
        </div>

        {/* Empty State */}
        {isEmpty && (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
            <p className="text-muted-foreground">
              No components registered yet. Design a component, save it under{" "}
              <span className="font-heading">components/ui/</span>, and add it to{" "}
              <span className="font-heading">lib/component-registry.tsx</span> to see it here.
            </p>
          </div>
        )}

        {/* Component Catalog */}
        {!isEmpty && (
          <div className="space-y-16">
            {categories.map((category) => {
              const components = getComponentsByCategory(category);
              return (
                <section
                  key={category}
                  id={category.toLowerCase().replace(/\s+/g, "-")}
                  className="space-y-8"
                >
                  <div className="scroll-mt-24 border-b border-border pb-3">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                      {category}
                    </h2>
                  </div>

                  <div className="space-y-10">
                    {components.map((comp) => (
                      <div key={comp.name} className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium text-foreground">{comp.name}</h3>
                          <p className="text-sm text-muted-foreground">{comp.description}</p>
                          <p className="mt-1 font-heading text-xs text-muted-foreground">
                            {comp.importPath}
                          </p>
                        </div>

                        {/* Live Preview */}
                        <div className="rounded-lg border border-border bg-background p-6">
                          {comp.preview}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            Registry defined in <span className="font-heading">lib/component-registry.tsx</span>.
            {componentRegistry.length} component
            {componentRegistry.length !== 1 ? "s" : ""} registered.
          </p>
        </footer>
      </main>
    </div>
  );
}
