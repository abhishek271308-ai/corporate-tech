import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import OrganizationSchema from "@/components/OrganizationSchema";
import { createPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Digital Product Engineering",
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <Hero />
      <Features />
    </>
  );
}
