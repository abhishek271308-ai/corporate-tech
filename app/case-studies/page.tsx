import type { Metadata } from "next";
import CaseStudies from "@/components/sections/CaseStudies";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Case Studies",
  description:
    "Explore sample project concepts across web development, artificial intelligence, and e-commerce.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return <CaseStudies />;
}
