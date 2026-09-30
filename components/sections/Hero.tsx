"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotionPreference } from "@/lib/use-reduced-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Layers3,
  Pause,
  Play,
} from "lucide-react";

const headlines = [
  "digital products.",
  "intelligent systems.",
  "scalable platforms.",
];

const technologies = ["Next.js", "React", "TypeScript", "Node.js", "Python"];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotionPreference();

  const animate = reduceMotion === false && !paused;

  useEffect(() => {
    if (!animate) return;

    const interval = window.setInterval(() => {
      setActiveIndex((previous) => {
        return (previous + 1) % headlines.length;
      });
    }, 3500);

    return () => window.clearInterval(interval);
  }, [animate]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden border-b border-border"
    >
      {/* Decorative gradient background */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={animate ? { x: [0, 35, 0], y: [0, 20, 0] } : { x: 0, y: 0 }}
        transition={{
          duration: animate ? 12 : 0,
          repeat: animate ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-32 top-0 -z-10 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left: headline and actions */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted">
              <Code2 size={16} aria-hidden="true" className="text-primary" />
              Strategy. Design. Engineering.
            </p>

            <h1
              id="hero-heading"
              className="mt-7 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl xl:text-6xl"
            >
              {/* Stable heading for screen readers */}
              <span className="sr-only">
                We build digital products, intelligent systems, and scalable
                platforms.
              </span>

              <span aria-hidden="true">
                We build
                <span className="mt-2 grid text-primary">
                  {headlines.map((headline, index) => (
                    <motion.span
                      key={headline}
                      initial={false}
                      animate={{
                        opacity: activeIndex === index ? 1 : 0,
                      }}
                      transition={{
                        duration: animate ? 0.35 : 0,
                      }}
                      className="col-start-1 row-start-1"
                    >
                      {headline}
                    </motion.span>
                  ))}
                </span>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Turn your next big idea into a useful digital experience. We
              design and engineer products that help your business grow.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
              >
                Start a Project
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>

              <Link
                href="/case-studies"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 font-semibold transition-colors hover:border-primary"
              >
                Explore Our Work
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>

            {/* Pause automatically changing content */}
            <button
              type="button"
              onClick={() => setPaused((previous) => !previous)}
              disabled={reduceMotion !== false}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm text-muted hover:text-foreground disabled:cursor-default"
            >
              {animate ? (
                <Pause size={15} aria-hidden="true" />
              ) : (
                <Play size={15} aria-hidden="true" />
              )}

              {reduceMotion !== false
                ? "Animations disabled"
                : paused
                  ? "Resume animations"
                  : "Pause animations"}
            </button>
          </div>

          {/* Right: service overview */}
          <div className="relative rounded-3xl border border-border bg-surface/80 p-6 shadow-xl shadow-indigo-500/5 backdrop-blur-sm sm:p-8">
            <div className="flex items-center gap-4 border-b border-border pb-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Layers3 size={24} aria-hidden="true" />
              </span>

              <div>
                <p className="text-lg font-semibold">From idea to impact</p>
                <p className="text-sm text-muted">
                  One connected delivery process
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {[
                {
                  number: "01",
                  title: "Discover",
                  description: "Define the problem, users, and business goals.",
                },
                {
                  number: "02",
                  title: "Design",
                  description: "Shape clear, accessible product experiences.",
                },
                {
                  number: "03",
                  title: "Develop",
                  description: "Build secure, maintainable applications.",
                },
                {
                  number: "04",
                  title: "Deliver",
                  description: "Test, launch, and improve with real feedback.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="flex gap-4 rounded-2xl border border-border bg-background/60 p-4"
                >
                  <span className="pt-1 font-mono text-sm text-primary">
                    {step.number}
                  </span>

                  <div>
                    <h2 className="font-semibold">{step.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology badges */}
        <div className="mt-16 border-t border-border pt-8">
          <p className="text-sm text-muted">Technologies we build with</p>

          <ul className="mt-5 flex flex-wrap gap-3">
            {technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-border bg-surface px-5 py-2 text-sm font-medium"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
