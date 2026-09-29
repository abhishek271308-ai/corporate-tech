import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Talk to Nexora about digital products, AI solutions, and cloud engineering.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Let’s build together
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Your next chapter
            <span className="block text-primary">starts here.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
            Have an idea, a technical challenge, or a product ready to scale?
            Tell us what you want to achieve.
          </p>

          <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-semibold">What should you include?</h2>

            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-muted">
              <li>Your business goals and intended users.</li>
              <li>The product or system you want to build.</li>
              <li>Your expected timeline and budget, if available.</li>
            </ul>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
