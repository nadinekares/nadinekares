import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Hosting Plans — Nadine Kares",
  description: "Choose your website hosting plan.",
  robots: { index: false, follow: false },
};

export default function PricingPage() {
  return (
    <>
      <Script async src="https://js.stripe.com/v3/pricing-table.js" />
      <main className="min-h-svh bg-white px-6 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-1 font-label text-xs uppercase tracking-widest text-neutral-400 transition-colors hover:text-neutral-900"
          >
            <span aria-hidden="true">&larr;</span> Back
          </Link>

          <h1 className="font-heading text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Hosting Plans
          </h1>
          <p className="mt-4 max-w-xl font-copy text-lg text-neutral-500">
            Choose the plan that fits your needs. Each plan includes hosting,
            maintenance, and ongoing support for your website.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          {/* @ts-expect-error - Stripe custom element */}
          <stripe-pricing-table
            pricing-table-id="prctbl_1TFxD7J9I0o75Ux37mucIVW6"
            publishable-key="pk_live_51TBtVGJ9I0o75Ux3p3hgGcKsZ768SP67rNlCX0iDP1nHUo6Jm6mwxmUl3srKk9HyIjLMYDMktDlMWmzGWGBXanP700fI0EZgZf"
          />
        </div>
      </main>
    </>
  );
}
