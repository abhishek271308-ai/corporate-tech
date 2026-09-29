export const categories = [
  "All",
  "Web Development",
  "AI Solutions",
  "E-commerce",
] as const;

export type Category = (typeof categories)[number];

type CaseStudy = {
  slug: string;
  title: string;
  category: Exclude<Category, "All">;
  description: string;
  technologies: string[];
  challenge: string;
  approach: string;
  features: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "business-management-platform",
    title: "Business Management Platform",
    category: "Web Development",
    description:
      "A sample dashboard concept for managing everyday business operations in one place.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    challenge:
      "Teams often manage tasks, customer records, and reporting across separate tools. This concept explores a shared workspace for those activities.",
    approach:
      "The proposed application combines a dashboard, searchable records, and task management with role-based access.",
    features: [
      "Dashboard with business activity summaries",
      "Customer and project records",
      "Task assignment and status tracking",
      "Role-based access for team members",
    ],
  },
  {
    slug: "ai-knowledge-assistant",
    title: "AI Knowledge Assistant",
    category: "AI Solutions",
    description:
      "A sample assistant concept for finding answers across internal documents.",
    technologies: ["Python", "React", "Vector Search"],
    challenge:
      "Useful information can be scattered across documents. This concept explores how a conversational interface could help teams find relevant sources.",
    approach:
      "The proposed workflow indexes approved documents, retrieves relevant passages, and generates answers with source references and human feedback.",
    features: [
      "Document upload and indexing",
      "Natural-language questions",
      "Source references alongside answers",
      "Feedback and review workflows",
    ],
  },
  {
    slug: "modern-commerce-platform",
    title: "Modern Commerce Platform",
    category: "E-commerce",
    description:
      "A sample storefront concept focused on product discovery and simple shopping journeys.",
    technologies: ["React", "Node.js", "MongoDB"],
    challenge:
      "Shoppers need clear product information and predictable navigation. This concept explores a storefront that keeps browsing and purchasing easy to follow.",
    approach:
      "The proposed platform brings together a filterable product catalog, product details, cart management, and an administrative workspace.",
    features: [
      "Product search and category filters",
      "Product pages with image galleries",
      "Shopping cart and checkout flow",
      "Product and order administration",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}
