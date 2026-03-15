// ═══════════════════════════════════════════════════════════════
// Design Tokens — Single Source of Truth
// ═══════════════════════════════════════════════════════════════
//
// This file defines all design tokens for the project.
// The styleguide auto-generates from these definitions.
//
// When changing a token VALUE, update both this file AND
// the matching CSS custom property in globals.css.
//
// When adding a NEW token, add it here AND in globals.css
// (both the :root property and the @theme inline mapping).
// ═══════════════════════════════════════════════════════════════

// ─── Types ───────────────────────────────────────────────────

export interface ColorToken {
  /** Display name shown in the styleguide */
  name: string;
  /** CSS variable reference, e.g. "var(--primary)" */
  cssVar: string;
  /** Tailwind utility class, e.g. "bg-primary" */
  twClass: string;
  /** Raw value from globals.css, e.g. "oklch(0.205 0 0)" */
  value: string;
}

export interface FontToken {
  /** Human-readable name */
  name: string;
  /** Tailwind utility class, e.g. "font-copy" */
  twClass: string;
  /** CSS variable name, e.g. "--font-copy" */
  cssVar: string;
  /** Full font stack */
  stack: string;
}

export interface SpacingToken {
  label: string;
  twClass: string;
  value: string;
}

export interface RadiusToken {
  label: string;
  twClass: string;
  cssVar: string;
  /** Computed pixel value for display */
  px: string;
}

// ─── COLORS ──────────────────────────────────────────────────

export const themeColors: ColorToken[] = [
  {
    name: "background",
    cssVar: "var(--background)",
    twClass: "bg-background",
    value: "oklch(1 0 0)",
  },
  {
    name: "foreground",
    cssVar: "var(--foreground)",
    twClass: "text-foreground",
    value: "oklch(0.145 0 0)",
  },
  { name: "primary", cssVar: "var(--primary)", twClass: "bg-primary", value: "oklch(0.205 0 0)" },
  {
    name: "primary-foreground",
    cssVar: "var(--primary-foreground)",
    twClass: "bg-primary-foreground",
    value: "oklch(0.985 0 0)",
  },
  {
    name: "secondary",
    cssVar: "var(--secondary)",
    twClass: "bg-secondary",
    value: "oklch(0.97 0 0)",
  },
  {
    name: "secondary-foreground",
    cssVar: "var(--secondary-foreground)",
    twClass: "bg-secondary-foreground",
    value: "oklch(0.205 0 0)",
  },
  { name: "muted", cssVar: "var(--muted)", twClass: "bg-muted", value: "oklch(0.97 0 0)" },
  {
    name: "muted-foreground",
    cssVar: "var(--muted-foreground)",
    twClass: "bg-muted-foreground",
    value: "oklch(0.556 0 0)",
  },
  { name: "accent", cssVar: "var(--accent)", twClass: "bg-accent", value: "oklch(0.97 0 0)" },
  {
    name: "accent-foreground",
    cssVar: "var(--accent-foreground)",
    twClass: "bg-accent-foreground",
    value: "oklch(0.205 0 0)",
  },
  {
    name: "destructive",
    cssVar: "var(--destructive)",
    twClass: "bg-destructive",
    value: "oklch(0.577 0.245 27.325)",
  },
  { name: "card", cssVar: "var(--card)", twClass: "bg-card", value: "oklch(1 0 0)" },
  {
    name: "card-foreground",
    cssVar: "var(--card-foreground)",
    twClass: "bg-card-foreground",
    value: "oklch(0.145 0 0)",
  },
  { name: "popover", cssVar: "var(--popover)", twClass: "bg-popover", value: "oklch(1 0 0)" },
  {
    name: "popover-foreground",
    cssVar: "var(--popover-foreground)",
    twClass: "bg-popover-foreground",
    value: "oklch(0.145 0 0)",
  },
  { name: "border", cssVar: "var(--border)", twClass: "bg-border", value: "oklch(0.922 0 0)" },
  { name: "input", cssVar: "var(--input)", twClass: "bg-input", value: "oklch(0.922 0 0)" },
  { name: "ring", cssVar: "var(--ring)", twClass: "bg-ring", value: "oklch(0.708 0 0)" },
  { name: "brand", cssVar: "var(--brand)", twClass: "bg-brand", value: "oklch(0.53 0.185 33)" },
];

export const chartColors: ColorToken[] = [
  {
    name: "chart-1",
    cssVar: "var(--chart-1)",
    twClass: "bg-chart-1",
    value: "oklch(0.809 0.105 251.813)",
  },
  {
    name: "chart-2",
    cssVar: "var(--chart-2)",
    twClass: "bg-chart-2",
    value: "oklch(0.623 0.214 259.815)",
  },
  {
    name: "chart-3",
    cssVar: "var(--chart-3)",
    twClass: "bg-chart-3",
    value: "oklch(0.546 0.245 262.881)",
  },
  {
    name: "chart-4",
    cssVar: "var(--chart-4)",
    twClass: "bg-chart-4",
    value: "oklch(0.488 0.243 264.376)",
  },
  {
    name: "chart-5",
    cssVar: "var(--chart-5)",
    twClass: "bg-chart-5",
    value: "oklch(0.424 0.199 265.638)",
  },
];

export const sidebarColors: ColorToken[] = [
  { name: "sidebar", cssVar: "var(--sidebar)", twClass: "bg-sidebar", value: "oklch(0.985 0 0)" },
  {
    name: "sidebar-foreground",
    cssVar: "var(--sidebar-foreground)",
    twClass: "bg-sidebar-foreground",
    value: "oklch(0.145 0 0)",
  },
  {
    name: "sidebar-primary",
    cssVar: "var(--sidebar-primary)",
    twClass: "bg-sidebar-primary",
    value: "oklch(0.205 0 0)",
  },
  {
    name: "sidebar-primary-foreground",
    cssVar: "var(--sidebar-primary-foreground)",
    twClass: "bg-sidebar-primary-foreground",
    value: "oklch(0.985 0 0)",
  },
  {
    name: "sidebar-accent",
    cssVar: "var(--sidebar-accent)",
    twClass: "bg-sidebar-accent",
    value: "oklch(0.97 0 0)",
  },
  {
    name: "sidebar-accent-foreground",
    cssVar: "var(--sidebar-accent-foreground)",
    twClass: "bg-sidebar-accent-foreground",
    value: "oklch(0.205 0 0)",
  },
  {
    name: "sidebar-border",
    cssVar: "var(--sidebar-border)",
    twClass: "bg-sidebar-border",
    value: "oklch(0.922 0 0)",
  },
  {
    name: "sidebar-ring",
    cssVar: "var(--sidebar-ring)",
    twClass: "bg-sidebar-ring",
    value: "oklch(0.708 0 0)",
  },
];

// ─── TYPOGRAPHY ──────────────────────────────────────────────

export const fonts: FontToken[] = [
  {
    name: "Copy (Geist)",
    twClass: "font-copy",
    cssVar: "--font-copy",
    stack: '"Geist", ui-sans-serif, system-ui, sans-serif',
  },
  {
    name: "Heading (Safiro)",
    twClass: "font-heading",
    cssVar: "--font-heading",
    stack: '"Safiro", ui-sans-serif, system-ui, sans-serif',
  },
  {
    name: "Label (GeistMono)",
    twClass: "font-label",
    cssVar: "--font-label",
    stack: '"GeistMono", Arial, sans-serif',
  },
];

export const fontSizes = [
  { cls: "text-xs", label: "text-xs", size: "0.75rem / 12px" },
  { cls: "text-sm", label: "text-sm", size: "0.875rem / 14px" },
  { cls: "text-base", label: "text-base", size: "1rem / 16px" },
  { cls: "text-lg", label: "text-lg", size: "1.125rem / 18px" },
  { cls: "text-xl", label: "text-xl", size: "1.25rem / 20px" },
  { cls: "text-2xl", label: "text-2xl", size: "1.5rem / 24px" },
  { cls: "text-3xl", label: "text-3xl", size: "1.875rem / 30px" },
  { cls: "text-4xl", label: "text-4xl", size: "2.25rem / 36px" },
  { cls: "text-5xl", label: "text-5xl", size: "3rem / 48px" },
  { cls: "text-6xl", label: "text-6xl", size: "3.75rem / 60px" },
];

export const fontWeights = [
  { cls: "font-thin", label: "font-thin", weight: "100" },
  { cls: "font-extralight", label: "font-extralight", weight: "200" },
  { cls: "font-light", label: "font-light", weight: "300" },
  { cls: "font-normal", label: "font-normal", weight: "400" },
  { cls: "font-medium", label: "font-medium", weight: "500" },
  { cls: "font-semibold", label: "font-semibold", weight: "600" },
  { cls: "font-bold", label: "font-bold", weight: "700" },
  { cls: "font-extrabold", label: "font-extrabold", weight: "800" },
  { cls: "font-black", label: "font-black", weight: "900" },
];

export const headingHierarchy = [
  {
    tag: "h1",
    cls: "text-5xl font-bold tracking-tight",
    description: "text-5xl font-bold tracking-tight",
  },
  {
    tag: "h2",
    cls: "text-4xl font-semibold tracking-tight",
    description: "text-4xl font-semibold tracking-tight",
  },
  {
    tag: "h3",
    cls: "text-3xl font-semibold tracking-tight",
    description: "text-3xl font-semibold tracking-tight",
  },
  {
    tag: "h4",
    cls: "text-2xl font-semibold tracking-tight",
    description: "text-2xl font-semibold tracking-tight",
  },
  { tag: "h5", cls: "text-xl font-medium", description: "text-xl font-medium" },
  { tag: "h6", cls: "text-lg font-medium", description: "text-lg font-medium" },
];

export const typographyStyles = [
  {
    name: "Tag",
    cls: "text-xs font-normal tracking-[0.1em] uppercase font-label",
    description: "text-xs font-normal tracking-[0.1em] uppercase",
  },
];

export const trackingValues = [
  { cls: "tracking-tighter", label: "tracking-tighter", val: "-0.05em" },
  { cls: "tracking-tight", label: "tracking-tight", val: "-0.025em" },
  { cls: "tracking-normal", label: "tracking-normal", val: "0em" },
  { cls: "tracking-wide", label: "tracking-wide", val: "0.025em" },
  { cls: "tracking-wider", label: "tracking-wider", val: "0.05em" },
  { cls: "tracking-widest", label: "tracking-widest", val: "0.1em" },
];

export const leadingValues = [
  { cls: "leading-tight", label: "leading-tight", val: "1.25" },
  { cls: "leading-snug", label: "leading-snug", val: "1.375" },
  { cls: "leading-normal", label: "leading-normal", val: "1.5" },
  { cls: "leading-relaxed", label: "leading-relaxed", val: "1.625" },
  { cls: "leading-loose", label: "leading-loose", val: "2" },
];

// ─── SPACING ─────────────────────────────────────────────────

export const spacingScale: SpacingToken[] = [
  { label: "1", twClass: "w-1", value: "0.25rem / 4px" },
  { label: "2", twClass: "w-2", value: "0.5rem / 8px" },
  { label: "3", twClass: "w-3", value: "0.75rem / 12px" },
  { label: "4", twClass: "w-4", value: "1rem / 16px" },
  { label: "5", twClass: "w-5", value: "1.25rem / 20px" },
  { label: "6", twClass: "w-6", value: "1.5rem / 24px" },
  { label: "8", twClass: "w-8", value: "2rem / 32px" },
  { label: "10", twClass: "w-10", value: "2.5rem / 40px" },
  { label: "12", twClass: "w-12", value: "3rem / 48px" },
  { label: "16", twClass: "w-16", value: "4rem / 64px" },
  { label: "20", twClass: "w-20", value: "5rem / 80px" },
  { label: "24", twClass: "w-24", value: "6rem / 96px" },
  { label: "32", twClass: "w-32", value: "8rem / 128px" },
];

export const paddingExamples = [
  { cls: "p-2", label: "p-2" },
  { cls: "p-4", label: "p-4" },
  { cls: "p-6", label: "p-6" },
  { cls: "p-8", label: "p-8" },
];

export const gapExamples = [
  { cls: "gap-1", label: "gap-1 (4px)" },
  { cls: "gap-2", label: "gap-2 (8px)" },
  { cls: "gap-4", label: "gap-4 (16px)" },
  { cls: "gap-6", label: "gap-6 (24px)" },
  { cls: "gap-8", label: "gap-8 (32px)" },
];

// ─── BORDER RADIUS ───────────────────────────────────────────

export const radiusScale: RadiusToken[] = [
  { label: "rounded-sm", twClass: "rounded-sm", cssVar: "var(--radius-sm)", px: "4px" },
  { label: "rounded-md", twClass: "rounded-md", cssVar: "var(--radius-md)", px: "8px" },
  { label: "rounded-lg", twClass: "rounded-lg", cssVar: "var(--radius-lg)", px: "10px" },
  { label: "rounded-xl", twClass: "rounded-xl", cssVar: "var(--radius-xl)", px: "14px" },
  { label: "rounded-2xl", twClass: "rounded-2xl", cssVar: "var(--radius-2xl)", px: "18px" },
  { label: "rounded-3xl", twClass: "rounded-3xl", cssVar: "var(--radius-3xl)", px: "22px" },
  { label: "rounded-full", twClass: "rounded-full", cssVar: "9999px", px: "9999px" },
];

// ─── GRID ────────────────────────────────────────────────────

export const gridColumns = [1, 2, 3, 4, 6, 12];

export const containerWidths = [
  { cls: "max-w-sm", label: "max-w-sm", size: "384px" },
  { cls: "max-w-md", label: "max-w-md", size: "448px" },
  { cls: "max-w-lg", label: "max-w-lg", size: "512px" },
  { cls: "max-w-xl", label: "max-w-xl", size: "576px" },
  { cls: "max-w-2xl", label: "max-w-2xl", size: "672px" },
  { cls: "max-w-4xl", label: "max-w-4xl", size: "896px" },
  { cls: "max-w-6xl", label: "max-w-6xl", size: "1152px" },
];

// ─── SHADOWS ─────────────────────────────────────────────────

export const shadowScale = [
  { cls: "shadow-sm", label: "shadow-sm" },
  { cls: "shadow", label: "shadow" },
  { cls: "shadow-md", label: "shadow-md" },
  { cls: "shadow-lg", label: "shadow-lg" },
  { cls: "shadow-xl", label: "shadow-xl" },
];

// ─── OPACITY ─────────────────────────────────────────────────

export const opacityScale = [100, 80, 60, 40, 20, 10, 5];

// ─── BORDERS ─────────────────────────────────────────────────

export const borderStyles = [
  { cls: "border", label: "border" },
  { cls: "border-2", label: "border-2" },
  { cls: "border-t", label: "border-t" },
  { cls: "border-b", label: "border-b" },
  { cls: "border-l-4", label: "border-l-4" },
  { cls: "border-dashed border", label: "border-dashed" },
  { cls: "border-dotted border", label: "border-dotted" },
  { cls: "border-double border-4", label: "border-double" },
];

// ─── HELPERS ─────────────────────────────────────────────────

/** Check if a color token renders as a dark swatch (needs light ring for visibility) */
export function isDarkSwatch(name: string): boolean {
  return (
    name === "foreground" ||
    name === "primary" ||
    name === "secondary-foreground" ||
    name === "accent-foreground" ||
    name === "card-foreground" ||
    name === "popover-foreground" ||
    name === "muted-foreground" ||
    name === "sidebar-foreground" ||
    name === "sidebar-primary" ||
    name === "sidebar-accent-foreground" ||
    name.includes("chart") ||
    name === "brand"
  );
}
