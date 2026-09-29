"use client";

import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowUpRight, BrainCircuit, Check, Cloud, Code2 } from "lucide-react";

const solutions = [
  {
    id: "web",
    label: "Web Development",
    icon: Code2,
    title: "Digital products built around your business.",
    description:
      "Turn your ideas into responsive websites, customer portals, and web applications with clear user journeys and maintainable architecture.",
    features: [
      "Corporate websites and product showcases",
      "Custom dashboards and business applications",
      "E-commerce experiences and integrations",
      "API development and third-party integrations",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js"],
    deliverable: "From discovery to deployment",
    detail:
      "Define the requirements, design the experience, build the product, and prepare it for launch.",
  },
  {
    id: "ai",
    label: "AI Solutions",
    icon: BrainCircuit,
    title: "Make your knowledge and workflows more useful.",
    description:
      "Explore practical AI applications that help teams search information, automate repetitive tasks, and make better use of business data.",
    features: [
      "AI assistants for internal knowledge",
      "Document search and summarization",
      "Workflow automation and data extraction",
      "Model evaluation and human review workflows",
    ],
    technologies: ["Python", "LangChain", "FastAPI", "Vector Search"],
    deliverable: "From prototype to practical application",
    detail:
      "Start with a focused use case, evaluate the results, and integrate the solution into your existing workflow.",
  },
  {
    id: "cloud",
    label: "Cloud Engineering",
    icon: Cloud,
    title: "Infrastructure that supports your next stage.",
    description:
      "Build a foundation for deploying, monitoring, and maintaining your applications as your product and team grow.",
    features: [
      "Cloud architecture and deployment planning",
      "Automated build and deployment pipelines",
      "Application monitoring and observability",
      "Backup and recovery planning",
    ],
    technologies: ["AWS", "Docker", "GitHub Actions", "PostgreSQL"],
    deliverable: "From architecture to ongoing operations",
    detail:
      "Plan the infrastructure, automate delivery, and establish visibility into application health and resource usage.",
  },
];

export default function Solutions() {
  return (
    <Tabs.Root defaultValue="web" className="mt-12">
      <Tabs.List
        aria-label="Explore our solutions"
        className="flex gap-2 overflow-x-auto rounded-2xl border border-border bg-surface p-2"
      >
        {solutions.map((solution) => {
          const Icon = solution.icon;

          return (
            <Tabs.Trigger
              key={solution.id}
              value={solution.id}
              className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
              {solution.label}
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>

      {solutions.map((solution) => {
        const Icon = solution.icon;

        return (
          <Tabs.Content
            key={solution.id}
            value={solution.id}
            className="mt-6 rounded-3xl border border-border bg-surface p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:p-10"
          >
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <div className="inline-flex rounded-2xl bg-primary/10 p-4 text-primary">
                  <Icon aria-hidden="true" className="h-7 w-7" />
                </div>

                <h2 className="mt-6 max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">
                  {solution.title}
                </h2>

                <p className="mt-4 max-w-xl leading-7 text-muted">
                  {solution.description}
                </p>

                <ul className="mt-6 space-y-4">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Discuss your project
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>

              <aside className="self-start rounded-2xl border border-border bg-background p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Our approach
                </p>

                <h3 className="mt-4 text-xl font-semibold">
                  {solution.deliverable}
                </h3>

                <p className="mt-4 text-sm leading-7 text-muted">
                  {solution.detail}
                </p>

                <div className="mt-8 border-t border-border pt-6">
                  <h4 className="text-sm font-semibold">Technology toolkit</h4>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {solution.technologies.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
