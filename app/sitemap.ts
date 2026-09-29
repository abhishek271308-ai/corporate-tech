import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/solutions",
    "/case-studies",
    "/contact",
    ...caseStudies.map((project) => `/case-studies/${project.slug}`),
  ];

  return routes.map((path) => ({
    url: `${site.url}${path}`,
  }));
}
