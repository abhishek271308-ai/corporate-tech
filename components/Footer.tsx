import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-border py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Let’s build together
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Have a challenge worth solving?
            </h2>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:self-auto"
          >
            Start a conversation
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              aria-label="Nexora home"
              className="inline-flex items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white"
              >
                N
              </span>

              <span className="text-xl font-bold tracking-widest">NEXORA</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
              Digital products, intelligent systems, and cloud platforms built
              around your business goals.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-semibold">Explore</h3>

            <ul className="mt-5 space-y-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-10 items-center py-2 text-sm text-muted transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold">Our expertise</h3>

            <ul className="mt-5 space-y-4 text-sm leading-6 text-muted">
              <li>Web &amp; Product Development</li>
              <li>AI &amp; Workflow Automation</li>
              <li>Cloud Engineering</li>
            </ul>

            <Link
              href="/solutions"
              className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-primary"
            >
              Explore solutions
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nexora. All rights reserved.</p>

          <a
            href="#main-content"
            className="inline-flex min-h-10 items-center gap-2 self-start transition-colors hover:text-primary"
          >
            Back to content
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
