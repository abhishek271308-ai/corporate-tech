const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;

const siteUrl =
  process.env.SITE_URL?.trim() ||
  (productionDomain ? `https://${productionDomain}` : "http://localhost:3000");

export const site = {
  name: "Nexora",
  title: "Nexora | Digital Product Engineering",
  description:
    "Digital products, AI solutions, and cloud platforms built for ambitious businesses.",
  url: new URL(siteUrl).origin,
};
