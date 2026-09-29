import {
  ArrowUpRight,
  BrainCircuit,
  Cloud,
  Code2,
  Layers3,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Intelligence built into your workflow",
    description:
      "Connect your business knowledge with AI assistants and automation that help your team make informed decisions.",
    icon: BrainCircuit,
    tags: ["AI assistants", "Knowledge search", "Automation"],
    className: "lg:col-span-2",
    iconClassName: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    number: "02",
    title: "Security from the start",
    description:
      "Build with clear access controls, validated inputs, and secure engineering practices.",
    icon: ShieldCheck,
    tags: ["Access control", "Validation"],
    className: "",
    iconClassName: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  {
    number: "03",
    title: "Ready to scale",
    description:
      "Create cloud platforms that can grow with your users, data, and business needs.",
    icon: Cloud,
    tags: ["Cloud architecture", "Observability"],
    className: "",
    iconClassName: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  },
  {
    number: "04",
    title: "Connected by design",
    description:
      "Bring your products, APIs, and business tools together through maintainable integrations.",
    icon: Layers3,
    tags: ["REST APIs", "Webhooks", "Data pipelines"],
    className: "lg:col-span-2",
    iconClassName: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="border-b border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section heading */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Our Capabilities
            </p>

            <h2
              id="features-heading"
              className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              Built for complex problems.
              <span className="block text-primary">
                Designed for real people.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-base leading-7 text-muted">
            From intelligent workflows to connected platforms, we build the
            foundations your next product needs.
          </p>
        </div>

        {/* Bento cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-primary/50 sm:p-8 ${feature.className}`}
              >
                {/* Card header */}
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.iconClassName}`}
                  >
                    <Icon size={24} aria-hidden="true" />
                  </span>

                  <span className="font-mono text-sm text-muted">
                    / {feature.number}
                  </span>
                </div>

                {/* Card content */}
                <h3 className="mt-8 max-w-lg text-2xl font-semibold tracking-tight">
                  {feature.title}
                </h3>

                <p className="mt-4 max-w-xl text-base leading-7 text-muted">
                  {feature.description}
                </p>

                {/* Capability badges */}
                <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                  {feature.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Section footer */}
        <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-border bg-surface px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Code2
              size={22}
              aria-hidden="true"
              className="mt-1 shrink-0 text-primary"
            />

            <div>
              <p className="font-semibold">
                Have a technical challenge in mind?
              </p>

              <p className="mt-1 text-sm leading-6 text-muted">
                Explore how we approach product development.
              </p>
            </div>
          </div>

          <a
            href="#main-content"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg text-sm font-semibold text-primary"
          >
            Back to overview
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
