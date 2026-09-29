import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";
import { getContactRateLimiter } from "@/lib/rate-limit";
import { site } from "@/lib/site";

const requestSchema = contactSchema.extend({
  recaptchaToken: z.string().min(1).max(4096),
});

const verificationSchema = z.object({
  success: z.boolean(),
  hostname: z.string().optional(),
});

const emailResponseSchema = z.object({
  id: z.string().min(1),
});

// Log diagnostic messages without printing configured credentials.
function logServerError(label: string, error: unknown) {
  let message = error instanceof Error ? error.message : "Unknown server error";

  const privateValues = [
    process.env.RECAPTCHA_SECRET_KEY,
    process.env.RESEND_API_KEY,
    process.env.UPSTASH_REDIS_REST_TOKEN,
    process.env.UPSTASH_REDIS_REST_URL,
  ];

  for (const value of privateValues) {
    if (value) {
      message = message.split(value).join("[REDACTED]");
    }
  }

  console.error(`[Contact API] ${label}: ${message}`);
}

export async function POST(request: Request) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  const requiredVariables = {
    RECAPTCHA_SECRET_KEY: secretKey,
    RESEND_API_KEY: resendKey,
    CONTACT_FROM_EMAIL: fromEmail,
    CONTACT_TO_EMAIL: toEmail,
    UPSTASH_REDIS_REST_URL: redisUrl,
    UPSTASH_REDIS_REST_TOKEN: redisToken,
  };

  const missingVariables = Object.entries(requiredVariables)
    .filter(([, value]) => !value?.trim())
    .map(([name]) => name);

  if (missingVariables.length > 0) {
    // Only variable names are logged, never their values.
    console.error(
      "[Contact API] Missing environment variables:",
      missingVariables.join(", "),
    );

    return NextResponse.json(
      {
        message:
          "The contact form is temporarily unavailable. Please try again later.",
      },
      { status: 503 },
    );
  }

  // Narrow the types before using these values below.
  if (!secretKey || !resendKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      { message: "The contact form is temporarily unavailable." },
      { status: 503 },
    );
  }

  // 1. Check the shared rate limit.
  try {
    const limiter = getContactRateLimiter();
    const limit = await limiter.limit("all-submissions");

    if (limit.reason === "timeout") {
      throw new Error("Redis rate-limit check timed out.");
    }

    if (!limit.success) {
      const retryAfter = Math.max(
        1,
        Math.ceil((limit.reset - Date.now()) / 1000),
      );

      return NextResponse.json(
        {
          message: "Too many requests. Please wait a minute and try again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
          },
        },
      );
    }
  } catch (error) {
    logServerError("Rate-limit check failed", error);

    return NextResponse.json(
      {
        message:
          "The contact form is temporarily unavailable. Please try again later.",
      },
      { status: 503 },
    );
  }

  // 2. Parse and validate the submitted data.
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request. Please try again." },
      { status: 400 },
    );
  }

  const result = requestSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        message: "Please check your form details and complete verification.",
      },
      { status: 400 },
    );
  }

  const { recaptchaToken, ...contactData } = result.data;

  // 3. Verify reCAPTCHA with Google.
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: recaptchaToken,
        }),
        signal: AbortSignal.timeout(10_000),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Google verification returned HTTP ${response.status}.`);
    }

    const verification = verificationSchema.safeParse(await response.json());

    if (!verification.success) {
      throw new Error("Google returned an unexpected response.");
    }

    if (!verification.data.success) {
      console.error("[Contact API] reCAPTCHA token was rejected.");

      return NextResponse.json(
        {
          message: "Verification failed or expired. Please complete it again.",
        },
        { status: 400 },
      );
    }

    const expectedHostname = new URL(site.url).hostname;

    if (verification.data.hostname !== expectedHostname) {
      console.error(
        "[Contact API] reCAPTCHA hostname mismatch. Check SITE_URL and the browser hostname.",
      );

      return NextResponse.json(
        {
          message:
            "Verification failed. Please open the correct website address and try again.",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    logServerError("reCAPTCHA verification failed", error);

    return NextResponse.json(
      {
        message: "Verification is temporarily unavailable. Please try again.",
      },
      { status: 503 },
    );
  }

  // 4. Send the enquiry through Resend.
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: contactData.email,
        subject: "New Nexora website enquiry",
        text: [
          "New website enquiry",
          "",
          `Name: ${contactData.name}`,
          `Email: ${contactData.email}`,
          `Company: ${contactData.company || "Not provided"}`,
          "",
          "Project details:",
          contactData.message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "[Contact API] Resend rejected the request. HTTP status:",
        response.status,
      );

      return NextResponse.json(
        {
          message: "Your enquiry could not be sent. Please try again later.",
        },
        { status: 502 },
      );
    }

    const emailResult = emailResponseSchema.safeParse(await response.json());

    if (!emailResult.success) {
      throw new Error("Resend returned an unexpected response.");
    }

    return NextResponse.json({
      message: "Thank you! Your enquiry was accepted for delivery.",
    });
  } catch (error) {
    logServerError("Email delivery confirmation failed", error);

    return NextResponse.json(
      {
        message:
          "We could not confirm whether your enquiry was accepted. Please wait before trying again.",
      },
      { status: 502 },
    );
  }
}
