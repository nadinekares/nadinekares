# Landing Page Project Starter

This file defines the default implementation standards for all landing page projects in this workspace.

## Required Tech Stack
- Next.js
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Motion (for animations)

## Package Manager Standard
- Use **Bun** as the default package manager.
- Prefer `bun add`, `bun remove`, `bun run`, and `bunx`.
- Do not use npm, pnpm, or yarn unless explicitly required by a project constraint.
- If `bun` is not available in `PATH`, use `~/.bun/bin/bun` and `~/.bun/bin/bunx`.

## Project Setup Standard
- Initialize projects in the current root directory (same level as `AGENTS.md`).
- Do not create a nested app folder during bootstrap.
- Ensure `package.json` is at the root, alongside `AGENTS.md`.

## Fast Bootstrap (Non-Interactive)
Use this sequence for consistent setup speed:

1) Scaffold Next.js (TypeScript + Tailwind v4 + App Router + Bun)

```bash
bunx --bun create-next-app@latest . \
  --typescript --tailwind --eslint --app --use-bun --no-src-dir \
  --import-alias "@/*" --yes --skip-git
```

2) Initialize shadcn/ui (local project config + theme tokens)

```bash
bunx --bun shadcn@latest init --defaults --base-color neutral --yes
```

3) Add at least one shadcn/ui primitive used in the page

```bash
bunx --bun shadcn@latest add button --yes
```

4) Add Motion

```bash
bun add motion
```

5) Generate a Styleguide Page

After setup, always create `app/styleguide/page.tsx` — a living reference of all design primitives defined in the project. This page must include:

- **Colors**: All CSS custom properties from `globals.css` rendered as labeled swatches (theme colors, chart colors, sidebar colors) with their Tailwind class names.
- **Typography**: Font family specimens (sans + mono), all font sizes (xs–6xl), all font weights (thin–black), heading hierarchy (h1–h6), letter spacing, and line height examples.
- **Buttons**: All shadcn/ui `Button` variants (default, secondary, outline, ghost, destructive, link), all sizes (xs, sm, default, lg), buttons with icons, icon-only buttons, and disabled state.
- **Spacing**: Visual spacing scale bars, padding examples, and gap examples with flex containers.
- **Border Radius**: All radius tokens (sm through full) shown as visual shapes.
- **Grid System**: Grid column layouts (1–12), a responsive grid example, and container max-widths.
- **Links**: Default, muted, inline, hover-underline, and button-as-link styles.
- **Icons**: Sample lucide-react icons with size variations.
- **Form Elements**: Text input, disabled input, textarea, select, checkbox, and radio buttons.
- **Shadows**: sm through xl.
- **Opacity**: Visual opacity scale.
- **Borders**: Solid, dashed, dotted, double, and directional variants.

The page must have a sticky navigation bar linking to each section. Every element must display its corresponding Tailwind class name or CSS variable for easy reference.

**Design Token System**: All design tokens (colors, fonts, spacing, radii, grid, shadows, etc.) are defined in `lib/tokens.ts` as the single source of truth. The styleguide auto-generates its UI by importing from this file. Components must use semantic Tailwind classes (e.g. `bg-primary`, `text-foreground`, `bg-background`) instead of hardcoded colors (e.g. `bg-white`, `text-neutral-900`).

**Token Sync Rule (CRITICAL)**: Whenever a design token is added, removed, or changed — regardless of which file the change originates in — ALL THREE files must be kept in sync:
1. `lib/tokens.ts` — the token definition (name, CSS var, Tailwind class, value)
2. `app/globals.css` — the CSS custom property in `:root` AND the `@theme inline` mapping (if applicable)
3. `app/styleguide/page.tsx` — MUST import new token arrays and add corresponding render sections

**Styleguide Auto-Import Pattern**: The styleguide uses imports + `.map()` rendering to display tokens. When adding a new token array to `lib/tokens.ts`:
1. **Export the array** from `lib/tokens.ts` (e.g. `export const typographyStyles = [...]`)
2. **Import it** at the top of `app/styleguide/page.tsx` in the existing import statement
3. **Add a render section** with the same pattern as other sections (e.g. colors, typography, buttons):
   ```jsx
   <div className="space-y-6">
     <h3 className="text-lg font-medium text-foreground">Section Name</h3>
     <div className="space-y-6 rounded-lg border border-border p-6">
       {arrayName.map((item) => (
         <div key={item.uniqueKey}>
           <p className="mb-1 font-heading text-xs text-muted-foreground">
             {item.displayName} — {item.description}
           </p>
           <p className={`${item.cls} text-foreground`}>
             Display Text
           </p>
         </div>
       ))}
     </div>
   </div>
   ```

**Examples:**
- **Adding a new color** (e.g. `--success`): Add to `themeColors` array in `lib/tokens.ts`, add `--success: oklch(...)` to `:root` in `globals.css`, add `--color-success: var(--success)` to `@theme inline` in `globals.css`. The styleguide picks it up automatically.
- **Changing a color value** (e.g. `--primary`): Update the `value` field in `lib/tokens.ts` AND the `:root` property in `globals.css`. The styleguide and all components update automatically.
- **Adding a new font family**: Add to `fonts` array in `lib/tokens.ts`, add the `--font-*` variable to `@theme inline` in `globals.css`. The styleguide picks it up automatically.
- **Adding a new typography style** (e.g. `typographyStyles`): Add array to `lib/tokens.ts`, import it in `app/styleguide/page.tsx`, add a render section with `.map()`. The styleguide displays it automatically.
- **Adding a new spacing/radius/shadow token**: Add to the relevant array in `lib/tokens.ts`. If it needs a custom CSS variable, also add to `globals.css`.
- **Renaming a token**: Update all three files and search the codebase for any component using the old name.

Never leave these files out of sync. When in doubt, update all three and verify the styleguide reflects your changes.

## Component Library Page

Every project must include a component library page at `app/components/page.tsx` for cataloging reusable UI components. This page:

- Lives at `/components` and displays a live catalog of all registered components.
- **Must be dev-only**: The page must call `notFound()` when `process.env.NODE_ENV !== "development"` so it is never accessible in production builds.
- Components are rendered live — editing a component updates both the catalog and every place it's used on the main site.
- Should never be linked from the main site navigation or any public-facing page.

**Component Registration Workflow**: When a new reusable component is designed:
1. Create the component file under `components/ui/` (for primitives) or `components/sections/` (for page sections).
2. Import it in `lib/component-registry.tsx` and add an entry to the `componentRegistry` array with: `name`, `description`, `category`, `importPath`, and a `preview` (live JSX with example props).
3. The component automatically appears on the `/components` page, grouped by category.

Components must use semantic token classes (`bg-primary`, `text-foreground`, etc.) — never hardcoded colors. This ensures they stay in sync with the design system.

## Playground Page

Every project must include a playground page at `app/playground/page.tsx` for testing and iterating on designs. This page:

- Lives at `/playground` and is used to experiment with layouts, components, and visual ideas before adding them to the real site.
- **Must be dev-only**: The page must call `notFound()` when `process.env.NODE_ENV !== "development"` so it is never accessible in production builds.
- Should start with a minimal shell (heading, description, empty area) so new experiments can be dropped in quickly.
- Can contain any experimental markup, components, or styles — it does not need to follow the landing page section structure.
- Should never be linked from the main site navigation or any public-facing page.

## Archive Page

Every project must include an archive page at `app/archive/page.tsx` for storing unused sections. This page:

- Lives at `/archive` and is used to save sections and components that have been removed from the live site but may be needed again later.
- **Must be dev-only**: The page must call `notFound()` when `process.env.NODE_ENV !== "development"` so it is never accessible in production builds.
- When a section is removed from the site, move it here instead of deleting it.
- Should never be linked from the main site navigation or any public-facing page.

## Setup Fallbacks (Important)
- If current folder name contains spaces/capital letters and `create-next-app` rejects `.`:
  - Scaffold into a temporary lowercase folder in the workspace, then move files to root.
  - Example:

```bash
bunx --bun create-next-app@latest landing-temp \
  --typescript --tailwind --eslint --app --use-bun --no-src-dir \
  --import-alias "@/*" --yes --skip-git
rsync -a landing-temp/ ./
rm -rf landing-temp
```

- If Bun fails with `unable to write files to tempdir` in sandboxed runs:
  - Re-run command with elevated permissions in Codex.
  - Do not switch package managers.

- Avoid `next/font/google` in initial scaffold if network access may be restricted.
  - Prefer local/system font variables first, then add hosted fonts later if needed.

## Asset Organization
- Store all image assets in Next.js `public/` directory.
- Use clear subfolders when needed (e.g. `public/images/hero`, `public/images/logos`).
- Reference images from root-relative paths (e.g. `/images/hero/main-visual.webp`).
- Always optimize images before uploading/adding them to the project (resize/compress, prefer modern formats like WebP when appropriate).

## UI Defaults
- Default theme must be **light mode**.
- Do not ship dark mode unless explicitly requested for the project.
- Two font families: **font-copy** (Geist Sans — body/copy text) and **font-heading** (Geist Mono — headings/code labels).
- In `globals.css` under `@theme inline`, set `--font-copy` directly to `"Geist", ui-sans-serif, system-ui, sans-serif` and `--font-heading` to `"Geist Mono", ui-monospace, monospace` (not `var(--font-geist-sans)`, which causes resolution issues in Tailwind v4).
- The base `html` element uses `font-copy`. Apply `font-heading` explicitly where needed.
- Never use serif fonts like Times New Roman.

## Custom Font Installation

When changing or adding custom fonts (especially for `font-heading`):

**When user requests a font change:**
1. Ask the user: "Where are the font files located?" — Get the file path.
2. Identify available font weights (Regular, Medium, SemiBold, Bold, etc.).

**Implementation workflow:**
1. **Convert to WOFF2** — Convert all necessary font weight files (.otf, .ttf, .woff) to WOFF2 format using fontTools for optimal web delivery.
2. **Store in public/** — Place converted `.woff2` files in `public/fonts/[fontname]/` directory (e.g. `public/fonts/safiro/`).
3. **Add @font-face rules** — Update `app/globals.css`:
   - Add `@font-face` declarations for each font weight (400, 500, 600, 700 minimum).
   - Use `font-display: swap` for performance.
   - Reference files with root-relative paths: `/fonts/[fontname]/[filename].woff2`.
4. **Update CSS variables** — In `app/globals.css` `@theme inline` block, update the font-family CSS variable (e.g. `--font-heading: "FontName", ui-sans-serif, system-ui, sans-serif`).
5. **Update design tokens** — In `lib/tokens.ts`, update the corresponding `FontToken` object:
   - Update `name`, `stack`, and `cssVar` fields.
   - Keep `twClass` unchanged (e.g. always `font-heading` for heading font).
6. **Apply to components** — Add the font class (e.g. `font-heading`) to elements that should use the new font.
7. **Verify** — Check that font files load (200 OK status) with no console errors, and text renders correctly.

**Example (Safiro):**
- Fonts stored in: `public/fonts/safiro/Safiro-*.woff2`
- @font-face: 4 declarations (400, 500, 600, 700)
- CSS variable: `--font-heading: "Safiro", ui-sans-serif, system-ui, sans-serif`
- Token: `{ name: "Heading (Safiro)", twClass: "font-heading", cssVar: "--font-heading", stack: '"Safiro", ...' }`
- Apply with: `<h1 className="font-heading ...">...</h1>`

**Token Sync (CRITICAL):** Keep `lib/tokens.ts` and `app/globals.css` in sync whenever fonts change. Always verify files load in development before publishing.

## Branch Naming Convention
- Use: `feature/xxx`
- Replace `xxx` with a short, descriptive kebab-case name.
- Examples:
  - `feature/hero-redesign`
  - `feature/pricing-section`
  - `feature/lead-form-optimization`

## Dev Server Rules
- **Never force-kill the Next.js dev server** (`pkill`, `kill -9`, etc.). Always stop it gracefully.
- If the dev server must be restarted, **always delete `.next/` first** (`rm -rf .next`) before starting a new one. Turbopack's persistent cache corrupts easily when the process is interrupted, causing `localhost` to stop working.
- Use `bun run dev` to start the dev server. Do not switch to npm/yarn.
- If the dev server is already running, reuse it — do not start a second instance.

## Implementation Notes
- Prefer reusable, composable sections and components.
- Keep copy structure and layout optimized for conversion-focused landing pages.
- Keep TypeScript strict and avoid `any` unless unavoidable.
- For initial delivery, prioritize a complete hero section with one clear primary CTA.
- Keep setup commands non-interactive (`--yes`, `--defaults`) to reduce iteration time.

## Landing Page Best Practices

### Visual Direction
- Define a clear visual system before building: typography scale, spacing scale, color palette, and component style.
- Use intentional typography pairings; avoid generic default font stacks unless brand requires it.
- Use strong visual hierarchy: clear section headings, short supporting copy, and consistent CTA emphasis.
- Keep layouts clean and breathable with consistent spacing rhythm.

### Conversion-Focused Structure
- Use this high-converting section order by default:
  1. Hero (value proposition + primary CTA)
  2. Social proof (logos, testimonials, metrics)
  3. Features/benefits
  4. Product/service preview
  5. Objection handling (FAQ or guarantees)
  6. Final CTA
- Keep one primary CTA goal per page and repeat it consistently.
- Use specific, benefit-driven copy instead of vague marketing language.

### UX and Interaction
- Design mobile-first; then refine tablet and desktop layouts.
- Keep interactions subtle and meaningful (scroll reveals, hover states, CTA feedback).
- Avoid animation noise; motion should support clarity, not distract.
- Ensure clear states for interactive elements (default, hover, active, focus, disabled).

### Accessibility
- Meet WCAG contrast standards for text and key UI controls.
- Provide visible focus styles for keyboard users.
- Use semantic HTML landmarks and heading order.
- Add alt text for meaningful images and labels for form controls.

### Performance and SEO
- **Always optimize for loading speed.** Every code change must consider performance impact. Prefer fast, lightweight solutions over heavy ones.
- Optimize Core Web Vitals (especially LCP and CLS).
- Use `next/image` for responsive image delivery with explicit `quality`, `sizes`, and `placeholder="blur"` (with `blurDataURL`) for above-the-fold images.
- Never use `priority` on images that are not immediately visible (e.g. lazy-loaded, behind interactions, below the fold).
- Compress/resize media assets before shipping (and ideally before committing them). Maximum source image width: 2560px. Strip EXIF metadata.
- Preload critical fonts used above the fold via `<link rel="preload">` in the layout.
- Keep bundle size lean; avoid unnecessary dependencies.
- Add metadata, Open Graph tags, and structured page titles/descriptions.

### Component and Code Quality
- Build sections as reusable components under a clear structure (e.g. `components/sections/*`).
- Keep Tailwind utility usage consistent; extract repeated patterns into shared components.
- Use shadcn/ui primitives first, then customize for brand expression.
- Keep strict TypeScript types for props, APIs, and form data.

### Content Standards
- Headlines should be clear, specific, and outcome-driven.
- Paragraphs should be short and scannable.
- Use real, credible proof points wherever possible (customer quotes, metrics, outcomes).
- End every major section with a clear next action.
