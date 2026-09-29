import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

let contactLimiter: Ratelimit | undefined;

export function getContactRateLimiter() {
  if (contactLimiter) {
    return contactLimiter;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Rate limiting is not configured.");
  }

  contactLimiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    prefix: `nexora:${process.env.NODE_ENV}:contact`,
    analytics: false,
    timeout: 3000,
  });

  return contactLimiter;
}
