import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { createPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) {
    notFound();
  }

  return createPageMetadata({
    title: `${project.title} — Sample Concept`,
    description: project.description,
    path: `/case-studies/${project.slug}`,
  });
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-5xl px-5 py-16 lg:px-8 lg:py-24">
      <Link
        href="/case-studies"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-primary"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        All case studies
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-primary">
          {project.category}
        </span>

        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
          Sample concept
        </span>
      </div>

      <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
        {project.title}
      </h1>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
        {project.description}
      </p>

      <p className="mt-6 rounded-xl border border-border bg-surface p-4 text-sm leading-6 text-muted">
        This is an illustrative project concept, not a completed client
        engagement. Features below describe the proposed scope.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold">The challenge</h2>
          <p className="mt-4 leading-7 text-muted">{project.challenge}</p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold">Proposed approach</h2>
          <p className="mt-4 leading-7 text-muted">{project.approach}</p>
        </section>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Planned capabilities</h2>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {project.features.map((feature) => (
            <li
              key={feature}
              className="flex gap-3 rounded-xl border border-border p-4"
            >
              <Check
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              />
              <span className="text-sm leading-6">{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Proposed technology</h2>

        <ul className="mt-5 flex flex-wrap gap-3">
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted"
            >
              {technology}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/10 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">Planning something similar?</h2>

        <p className="mt-3 leading-7 text-muted">
          Tell us about your goals and the challenges you want to solve.
        </p>

        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white"
        >
          Discuss your project
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
