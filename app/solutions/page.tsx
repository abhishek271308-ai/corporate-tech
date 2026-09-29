import type { Metadata } from "next";
import Solutions from "@/components/sections/Solutions";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Solutions",
  description:
    "Explore Nexora's web development, AI solutions, and cloud engineering services.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Technology solutions
        </p>

        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          The right technology.
          <span className="block text-primary">
            Built for your next chapter.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          From customer-facing products to intelligent workflows and cloud
          infrastructure, explore how we can help bring your ideas to life.
        </p>
      </div>

      <Solutions />
    </section>
  );
}
