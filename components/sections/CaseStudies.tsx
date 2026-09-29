"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Bot, Code2, ShoppingBag } from "lucide-react";
import { caseStudies, categories, type Category } from "@/lib/case-studies";

const icons = {
  "Web Development": Code2,
  "AI Solutions": Bot,
  "E-commerce": ShoppingBag,
};

export default function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredProjects = caseStudies.filter(
    (project) =>
      activeCategory === "All" || project.category === activeCategory,
  );

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Case studies & portfolio
      </p>

      <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
        Explore what we can build.
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        Sample project concepts across web development, artificial intelligence,
        and e-commerce.
      </p>

      <div
        role="group"
        aria-label="Filter projects by category"
        className="mt-10 flex flex-wrap gap-3"
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-5 py-3 text-sm font-medium transition-colors ${
              activeCategory === category
                ? "border-primary bg-primary text-white"
                : "border-border bg-surface text-muted hover:text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-6 text-sm text-muted"
      >
        Showing {filteredProjects.length} sample{" "}
        {filteredProjects.length === 1 ? "concept" : "concepts"}.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => {
          const Icon = icons[project.category];

          return (
            <article
              key={project.slug}
              className="flex flex-col rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Icon aria-hidden="true" className="h-7 w-7" />
                </div>

                <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                  Sample concept
                </span>
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-primary">
                {project.category}
              </p>

              <h2 className="mt-3 text-xl font-semibold">{project.title}</h2>

              <p className="mt-3 text-sm leading-7 text-muted">
                {project.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                  >
                    {technology}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Link
                  href={`/case-studies/${project.slug}`}
                  aria-label={`Explore ${project.title}`}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
                >
                  Explore concept
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
