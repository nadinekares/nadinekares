// ═══════════════════════════════════════════════════════════════
// Component Registry — Living Component Library
// ═══════════════════════════════════════════════════════════════
//
// Register reusable components here so they appear on the
// /components page. Each entry renders a live preview — editing
// the component file updates both the catalog and the main site.
//
// How to add a new component:
// 1. Create the component in components/ui/ (or components/sections/)
// 2. Import it below
// 3. Add an entry to componentRegistry with a preview
// ═══════════════════════════════════════════════════════════════

import type { ReactNode } from "react";

export interface RegisteredComponent {
  /** Display name shown in the catalog */
  name: string;
  /** Short description of what the component does */
  description: string;
  /** Category for grouping (e.g. "Cards", "Navigation", "Forms") */
  category: string;
  /** Import path for easy reference, e.g. "@/components/ui/feature-card" */
  importPath: string;
  /** Live rendered preview with example props */
  preview: ReactNode;
}

// ─── Registry ────────────────────────────────────────────────
// Add your components here. Example:
//
// import { FeatureCard } from "@/components/ui/feature-card";
//
// {
//   name: "Feature Card",
//   description: "Card with icon, title, and description",
//   category: "Cards",
//   importPath: "@/components/ui/feature-card",
//   preview: (
//     <FeatureCard
//       icon={<Star />}
//       title="Example Feature"
//       description="This is a preview of the card."
//     />
//   ),
// },
// ─────────────────────────────────────────────────────────────

export const componentRegistry: RegisteredComponent[] = [];

// ─── Helpers ─────────────────────────────────────────────────

/** Get unique categories from the registry */
export function getCategories(): string[] {
  return [...new Set(componentRegistry.map((c) => c.category))];
}

/** Get components filtered by category */
export function getComponentsByCategory(category: string): RegisteredComponent[] {
  return componentRegistry.filter((c) => c.category === category);
}
