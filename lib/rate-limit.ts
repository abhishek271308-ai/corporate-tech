import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

let contactLimiter: Ratelimit | undefined;

export function getContactRateLimiter() {
  if (contactLimiter) {
    return contactLimiter;
  }

  const rawUrl = process.env.UPSTASH_REDIS_REST_URL ?? "";
  const url = rawUrl.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  // Log configuration checks only, never credentials.
  console.info("[Redis config v2]", {
    urlPresent: Boolean(url),
    startsWithHttps: url.startsWith("https://"),
    surroundingWhitespace: rawUrl !== url,
    startsWithQuote: /^["'“”‘’`]/.test(url),
    containsAssignment: url.startsWith("UPSTASH_REDIS_REST_URL="),
    startsWithMarkdown: url.startsWith("["),
    tokenPresent: Boolean(token),
  });

  if (!url || !token) {
    throw new Error("Redis REST URL or token is missing.");
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error(
      "Redis REST URL is malformed. Check the Vercel Production variable.",
    );
  }

  if (
    !url.startsWith("https://") ||
    parsedUrl.protocol !== "https:" ||
    parsedUrl.username ||
    parsedUrl.password ||
    parsedUrl.search ||
    parsedUrl.hash ||
    parsedUrl.pathname !== "/"
  ) {
    throw new Error(
      "Redis REST URL must be a plain HTTPS endpoint copied from Upstash.",
    );
  }

  contactLimiter = new Ratelimit({
    redis: new Redis({
      url: parsedUrl.origin,
      token,
    }),
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    prefix: `nexora:${process.env.NODE_ENV}:contact`,
    analytics: false,
    timeout: 3000,
  });

  return contactLimiter;
}
