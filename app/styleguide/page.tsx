"use client";

import { Button } from "@/components/ui/button";
import {
  themeColors,
  chartColors,
  sidebarColors,
  fonts,
  fontSizes,
  fontWeights,
  headingHierarchy,
  trackingValues,
  leadingValues,
  spacingScale,
  paddingExamples,
  gapExamples,
  radiusScale,
  gridColumns,
  containerWidths,
  shadowScale,
  opacityScale,
  borderStyles,
  isDarkSwatch,
} from "@/lib/tokens";
import {
  ArrowRight,
  Check,
  Download,
  Heart,
  Mail,
  Plus,
  Search,
  Settings,
  Trash2,
  X,
} from "lucide-react";

function SectionHeader({ title, id }: { title: string; id: string }) {
  return (
    <div id={id} className="scroll-mt-24 border-b border-border pb-3">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
    </div>
  );
}

function ColorSwatch({
  name,
  cssVar,
  twClass,
}: {
  name: string;
  cssVar: string;
  twClass: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-16 w-full rounded-lg border border-border ${isDarkSwatch(name) ? "ring-1 ring-border" : ""}`}
        style={{ backgroundColor: cssVar }}
      />
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="font-heading text-xs text-muted-foreground">{twClass}</p>
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <div className="min-h-screen bg-background font-copy">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-8 overflow-x-auto px-6 py-4">
          <h1 className="shrink-0 text-lg font-bold tracking-tight text-foreground">
            Styleguide
          </h1>
          <div className="flex gap-6 text-sm">
            {[
              "Colors",
              "Typography",
              "Buttons",
              "Spacing",
              "Radius",
              "Grid",
              "Links",
              "Icons",
              "Forms",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl space-y-16 px-6 py-12">
        {/* ─── COLORS ─── */}
        <section className="space-y-8">
          <SectionHeader title="Colors" id="colors" />

          {/* Theme Colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Theme Colors
            </h3>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
              {themeColors.map((c) => (
                <ColorSwatch
                  key={c.name}
                  name={c.name}
                  cssVar={c.cssVar}
                  twClass={c.twClass}
                />
              ))}
            </div>
          </div>

          {/* Chart Colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Chart Colors
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {chartColors.map((c) => (
                <ColorSwatch
                  key={c.name}
                  name={c.name}
                  cssVar={c.cssVar}
                  twClass={c.twClass}
                />
              ))}
            </div>
          </div>

          {/* Sidebar Colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Sidebar Colors
            </h3>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
              {sidebarColors.map((c) => (
                <ColorSwatch
                  key={c.name}
                  name={c.name}
                  cssVar={c.cssVar}
                  twClass={c.twClass}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─── TYPOGRAPHY ─── */}
        <section className="space-y-8">
          <SectionHeader title="Typography" id="typography" />

          {/* Font Families — auto-generated from tokens */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">
              Font Families
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              {fonts.map((f) => (
                <div key={f.twClass} className="rounded-lg border border-border p-6">
                  <p className="mb-1 font-heading text-xs text-muted-foreground">
                    {f.twClass} ({f.name})
                  </p>
                  <p className={`${f.twClass} text-2xl`}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                  <p className={`mt-2 ${f.twClass} text-sm text-muted-foreground`}>
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
                    0123456789
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Font Sizes — auto-generated from tokens */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Font Sizes</h3>
            <div className="space-y-4 rounded-lg border border-border p-6">
              {fontSizes.map((item) => (
                <div
                  key={item.cls}
                  className="flex items-baseline gap-4 border-b border-border/50 pb-3 last:border-0 last:pb-0"
                >
                  <span className="w-20 shrink-0 font-heading text-xs text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="w-32 shrink-0 font-heading text-xs text-muted-foreground">
                    {item.size}
                  </span>
                  <span className={`${item.cls} text-foreground`}>
                    The quick brown fox
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Font Weights — auto-generated from tokens */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">
              Font Weights
            </h3>
            <div className="space-y-3 rounded-lg border border-border p-6">
              {fontWeights.map((item) => (
                <div
                  key={item.cls}
                  className="flex items-baseline gap-4 border-b border-border/50 pb-2 last:border-0 last:pb-0"
                >
                  <span className="w-28 shrink-0 font-heading text-xs text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="w-12 shrink-0 font-heading text-xs text-muted-foreground">
                    {item.weight}
                  </span>
                  <span className={`${item.cls} text-xl text-foreground`}>
                    The quick brown fox jumps over the lazy dog
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Heading Hierarchy — auto-generated from tokens */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">
              Heading Hierarchy
            </h3>
            <div className="space-y-6 rounded-lg border border-border p-6">
              {headingHierarchy.map((item) => (
                <div key={item.tag}>
                  <p className="mb-1 font-heading text-xs text-muted-foreground">
                    {item.tag} &mdash; {item.description}
                  </p>
                  <p className={`${item.cls} text-foreground`}>
                    Heading {item.tag.replace("h", "")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking — auto-generated from tokens */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">
              Letter Spacing (Tracking)
            </h3>
            <div className="space-y-3 rounded-lg border border-border p-6">
              {trackingValues.map((item) => (
                <div
                  key={item.cls}
                  className="flex items-baseline gap-4 border-b border-border/50 pb-2 last:border-0 last:pb-0"
                >
                  <span className="w-32 shrink-0 font-heading text-xs text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="w-16 shrink-0 font-heading text-xs text-muted-foreground">
                    {item.val}
                  </span>
                  <span className={`${item.cls} text-lg text-foreground`}>
                    The quick brown fox jumps
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Leading — auto-generated from tokens */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">
              Line Height (Leading)
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {leadingValues.map((item) => (
                <div
                  key={item.cls}
                  className="rounded-lg border border-border p-4"
                >
                  <p className="mb-2 font-heading text-xs text-muted-foreground">
                    {item.label} ({item.val})
                  </p>
                  <p className={`${item.cls} text-sm text-foreground`}>
                    The quick brown fox jumps over the lazy dog. Pack my box
                    with five dozen liquor jugs.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BUTTONS ─── */}
        <section className="space-y-8">
          <SectionHeader title="Buttons" id="buttons" />

          {/* Variants */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">
              Button Variants
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="rounded-lg border border-border p-4 font-heading text-xs text-muted-foreground">
              <p>&lt;Button variant=&quot;default | secondary | outline | ghost | destructive | link&quot;&gt;</p>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">
              Button Sizes
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="rounded-lg border border-border p-4 font-heading text-xs text-muted-foreground">
              <p>&lt;Button size=&quot;xs | sm | default | lg&quot;&gt;</p>
            </div>
          </div>

          {/* With Icons */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">
              Buttons with Icons
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button>
                <Mail data-icon="inline-start" />
                Send Email
              </Button>
              <Button variant="secondary">
                <Download data-icon="inline-start" />
                Download
              </Button>
              <Button variant="outline">
                Continue
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button variant="destructive">
                <Trash2 data-icon="inline-start" />
                Delete
              </Button>
            </div>
          </div>

          {/* Icon-Only */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">
              Icon-Only Buttons
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="icon-xs" variant="outline">
                <Plus />
              </Button>
              <Button size="icon-sm" variant="outline">
                <Settings />
              </Button>
              <Button size="icon" variant="outline">
                <Search />
              </Button>
              <Button size="icon-lg" variant="outline">
                <Heart />
              </Button>
            </div>
            <div className="rounded-lg border border-border p-4 font-heading text-xs text-muted-foreground">
              <p>&lt;Button size=&quot;icon-xs | icon-sm | icon | icon-lg&quot;&gt;</p>
            </div>
          </div>

          {/* States */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">
              Button States
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </section>

        {/* ─── SPACING ─── */}
        <section className="space-y-8">
          <SectionHeader title="Spacing" id="spacing" />

          {/* Spacing Scale — auto-generated from tokens */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">
              Spacing Scale (Padding / Margin / Gap)
            </h3>
            <div className="space-y-2 rounded-lg border border-border p-6">
              {spacingScale.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="w-8 shrink-0 text-right font-heading text-xs text-muted-foreground">
                    {item.label}
                  </span>
                  <div
                    className={`${item.twClass} h-4 rounded-sm bg-primary`}
                  />
                  <span className="font-heading text-xs text-muted-foreground">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Padding Demo — auto-generated from tokens */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">
              Padding Examples
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {paddingExamples.map((item) => (
                <div key={item.cls} className="rounded-lg border border-border">
                  <div className={`${item.cls}`}>
                    <div className="rounded bg-primary/10 p-3 text-center font-heading text-xs text-foreground">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gap Demo — auto-generated from tokens */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">
              Gap Examples (Flex)
            </h3>
            <div className="space-y-4">
              {gapExamples.map((item) => (
                <div key={item.cls}>
                  <p className="mb-2 font-heading text-xs text-muted-foreground">
                    {item.label}
                  </p>
                  <div className={`flex ${item.cls}`}>
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className="flex h-10 w-10 items-center justify-center rounded bg-primary text-xs text-primary-foreground"
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BORDER RADIUS ─── */}
        <section className="space-y-8">
          <SectionHeader title="Border Radius" id="radius" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-7">
            {radiusScale.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div
                  className={`${item.twClass} flex h-20 w-20 items-center justify-center border-2 border-primary bg-primary/10`}
                />
                <span className="font-heading text-xs text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── GRID SYSTEM ─── */}
        <section className="space-y-8">
          <SectionHeader title="Grid System" id="grid" />

          {/* Grid Columns — auto-generated from tokens */}
          <div className="space-y-6">
            {gridColumns.map((cols) => (
              <div key={cols}>
                <p className="mb-2 font-heading text-xs text-muted-foreground">
                  grid-cols-{cols}
                </p>
                <div
                  className="grid gap-2"
                  style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  }}
                >
                  {Array.from({ length: cols }, (_, i) => (
                    <div
                      key={i}
                      className="flex h-10 items-center justify-center rounded bg-primary/10 font-heading text-xs text-foreground"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Responsive Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Responsive Grid Example
            </h3>
            <p className="font-heading text-xs text-muted-foreground">
              grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="flex h-24 items-center justify-center rounded-lg border border-border bg-card font-heading text-sm text-muted-foreground"
                >
                  Card {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Max Width — auto-generated from tokens */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Container Max Widths
            </h3>
            <div className="space-y-3">
              {containerWidths.map((item) => (
                <div key={item.cls}>
                  <div
                    className={`${item.cls} h-6 rounded bg-primary/10`}
                  />
                  <span className="font-heading text-xs text-muted-foreground">
                    {item.label} &mdash; {item.size}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── LINKS ─── */}
        <section className="space-y-8">
          <SectionHeader title="Links" id="links" />

          <div className="space-y-6 rounded-lg border border-border p-6">
            <div className="space-y-2">
              <p className="font-heading text-xs text-muted-foreground">
                Default link
              </p>
              <a href="#" className="text-primary underline underline-offset-4 hover:text-primary/80">
                This is a default link
              </a>
            </div>
            <div className="space-y-2">
              <p className="font-heading text-xs text-muted-foreground">
                Muted link
              </p>
              <a href="#" className="text-muted-foreground underline underline-offset-4 hover:text-foreground">
                This is a muted link
              </a>
            </div>
            <div className="space-y-2">
              <p className="font-heading text-xs text-muted-foreground">
                Inline link in paragraph
              </p>
              <p className="text-foreground">
                This is a paragraph with an{" "}
                <a href="#" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
                  inline link
                </a>{" "}
                embedded within the text content.
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-heading text-xs text-muted-foreground">
                No-underline link (hover underline)
              </p>
              <a href="#" className="text-primary hover:underline underline-offset-4">
                Hover to see underline
              </a>
            </div>
            <div className="space-y-2">
              <p className="font-heading text-xs text-muted-foreground">
                Button-style link (via Button component)
              </p>
              <Button variant="link">Button as link</Button>
            </div>
          </div>
        </section>

        {/* ─── ICONS ─── */}
        <section className="space-y-8">
          <SectionHeader title="Icons" id="icons" />

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Icons via <span className="font-heading">lucide-react</span>. Default
              size is 16px (size-4) inside buttons.
            </p>
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
              {[
                { Icon: ArrowRight, name: "ArrowRight" },
                { Icon: Check, name: "Check" },
                { Icon: Download, name: "Download" },
                { Icon: Heart, name: "Heart" },
                { Icon: Mail, name: "Mail" },
                { Icon: Plus, name: "Plus" },
                { Icon: Search, name: "Search" },
                { Icon: Settings, name: "Settings" },
                { Icon: Trash2, name: "Trash2" },
                { Icon: X, name: "X" },
              ].map(({ Icon, name }) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-2 rounded-lg border border-border p-3"
                >
                  <Icon className="size-5 text-foreground" />
                  <span className="font-heading text-[10px] text-muted-foreground">
                    {name}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Icon Sizes
              </h3>
              <div className="flex items-end gap-6">
                {[
                  { cls: "size-3", label: "size-3 (12px)" },
                  { cls: "size-4", label: "size-4 (16px)" },
                  { cls: "size-5", label: "size-5 (20px)" },
                  { cls: "size-6", label: "size-6 (24px)" },
                  { cls: "size-8", label: "size-8 (32px)" },
                ].map((item) => (
                  <div
                    key={item.cls}
                    className="flex flex-col items-center gap-2"
                  >
                    <Heart className={`${item.cls} text-foreground`} />
                    <span className="font-heading text-[10px] text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── FORM ELEMENTS ─── */}
        <section className="space-y-8">
          <SectionHeader title="Form Elements" id="forms" />

          <div className="grid gap-8 md:grid-cols-2">
            {/* Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Text Input
              </label>
              <input
                type="text"
                placeholder="Placeholder text..."
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <p className="font-heading text-xs text-muted-foreground">
                border-input rounded-md h-9 text-sm
              </p>
            </div>

            {/* Disabled Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Disabled Input
              </label>
              <input
                type="text"
                placeholder="Disabled..."
                disabled
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Textarea */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Textarea
              </label>
              <textarea
                placeholder="Type your message..."
                rows={3}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            {/* Select */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Select
              </label>
              <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>

            {/* Checkbox */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Checkbox
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="size-4 rounded border border-primary accent-primary"
                />
                <span className="text-sm text-foreground">Accept terms</span>
              </div>
            </div>

            {/* Radio */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Radio Buttons
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="radio-demo"
                    className="size-4 accent-primary"
                    defaultChecked
                  />
                  <span className="text-sm text-foreground">Option A</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="radio-demo"
                    className="size-4 accent-primary"
                  />
                  <span className="text-sm text-foreground">Option B</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SHADOWS ─── */}
        <section className="space-y-8">
          <SectionHeader title="Shadows" id="shadows" />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
            {shadowScale.map((item) => (
              <div
                key={item.cls}
                className={`${item.cls} flex h-24 items-center justify-center rounded-lg border border-border bg-card`}
              >
                <span className="font-heading text-xs text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── OPACITY ─── */}
        <section className="space-y-8">
          <SectionHeader title="Opacity" id="opacity" />
          <div className="flex gap-3">
            {opacityScale.map((val) => (
              <div key={val} className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-16 rounded-lg bg-primary"
                  style={{ opacity: val / 100 }}
                />
                <span className="font-heading text-xs text-muted-foreground">
                  {val}%
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── BORDERS ─── */}
        <section className="space-y-8">
          <SectionHeader title="Borders" id="borders" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {borderStyles.map((item) => (
              <div
                key={item.label}
                className={`${item.cls} border-border flex h-16 items-center justify-center rounded-lg bg-card`}
              >
                <span className="font-heading text-xs text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            Built with Tailwind CSS v4, shadcn/ui, Geist fonts, and lucide-react.
            Tokens defined in <span className="font-heading">lib/tokens.ts</span>.
          </p>
        </footer>
      </main>
    </div>
  );
}
