"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { sendGTMEvent } from "@next/third-parties/google";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();

const fields = [
  {
    name: "name",
    label: "Full name",
    type: "text",
    autoComplete: "name",
    maxLength: 80,
    required: true,
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
    maxLength: 254,
    required: true,
  },
  {
    name: "company",
    label: "Company (optional)",
    type: "text",
    autoComplete: "organization",
    maxLength: 100,
    required: false,
  },
] as const;

const inputClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type Feedback = {
  type: "success" | "error";
  message: string;
};

export default function ContactForm() {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const captchaGroupRef = useRef<HTMLDivElement>(null);

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaRequested, setCaptchaRequested] = useState(false);
  const [captchaScriptLoaded, setCaptchaScriptLoaded] = useState(false);
  const [captchaLoadError, setCaptchaLoadError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  useEffect(() => {
    if (!captchaRequested || captchaScriptLoaded) return;

    const timeout = window.setTimeout(() => {
      setCaptchaLoadError(
        "Verification is taking longer than expected. Check your connection or content blocker. If it still does not appear, reload this page.",
      );
    }, 20_000);

    return () => window.clearTimeout(timeout);
  }, [captchaRequested, captchaScriptLoaded]);

  function requestCaptcha() {
    if (siteKey) {
      setCaptchaRequested(true);
    }
  }

  async function onSubmit(values: ContactValues) {
    setFeedback(null);

    if (!siteKey) {
      setFeedback({
        type: "error",
        message: "The contact form is temporarily unavailable.",
      });
      return;
    }

    if (!captchaToken) {
      requestCaptcha();
      captchaGroupRef.current?.focus();

      setFeedback({
        type: "error",
        message: "Please complete the reCAPTCHA verification before sending.",
      });
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          recaptchaToken: captchaToken,
        }),
      });

      const result: unknown = await response.json();

      const message =
        typeof result === "object" &&
        result !== null &&
        "message" in result &&
        typeof result.message === "string"
          ? result.message
          : response.ok
            ? "Thank you! Your enquiry was accepted for delivery."
            : "Something went wrong. Please try again.";

      if (!response.ok) {
        setFeedback({
          type: "error",
          message,
        });
        return;
      }

      setFeedback({
        type: "success",
        message,
      });

      reset();

      if (process.env.NEXT_PUBLIC_GTM_ID) {
        try {
          sendGTMEvent({
            event: "contact_enquiry_accepted",
            form_name: "contact",
          });
        } catch {
          console.warn("Analytics event could not be queued.");
        }
      }
    } catch {
      setFeedback({
        type: "error",
        message:
          "We could not confirm whether your enquiry was received. Please check your connection and wait before trying again.",
      });
    } finally {
      setCaptchaToken(null);
      captchaRef.current?.reset();
    }
  }

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit, () => {
          setFeedback(null);
          requestCaptcha();
        })(event);
      }}
      noValidate
      aria-busy={isSubmitting}
      className="rounded-3xl border border-border bg-surface p-6 sm:p-8"
    >
      <h2 className="text-2xl font-semibold">Tell us about your project</h2>

      <p className="mt-2 text-sm leading-6 text-muted">
        Share your goals, challenges, and what you want to build.
      </p>

      <fieldset disabled={isSubmitting} className="mt-8 space-y-5">
        <legend className="sr-only">Project enquiry details</legend>

        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
            </label>

            <input
              {...register(field.name)}
              onFocus={requestCaptcha}
              id={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              maxLength={field.maxLength}
              required={field.required}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={
                errors[field.name] ? `${field.name}-error` : undefined
              }
              className={inputClass}
            />

            {errors[field.name] && (
              <p
                id={`${field.name}-error`}
                className="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="message" className="text-sm font-medium">
            Project details
          </label>

          <textarea
            {...register("message")}
            onFocus={requestCaptcha}
            id="message"
            rows={5}
            required
            maxLength={3000}
            placeholder="What are you building, and how can we help?"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "message-hint message-error" : "message-hint"
            }
            className={`${inputClass} resize-y`}
          />

          <p id="message-hint" className="mt-2 text-xs text-muted">
            Between 20 and 3,000 characters.
          </p>

          {errors.message && (
            <p
              id="message-error"
              className="mt-2 text-sm text-red-600 dark:text-red-400"
            >
              {errors.message.message}
            </p>
          )}
        </div>

        {siteKey ? (
          <div
            ref={captchaGroupRef}
            tabIndex={-1}
            role="group"
            aria-label="Spam protection verification"
            className="rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <div className="min-h-[208px]">
              {captchaRequested ? (
                <>
                  <p
                    role="status"
                    aria-live="polite"
                    className="mb-3 text-sm leading-6 text-muted"
                  >
                    {captchaLoadError
                      ? "Verification needs attention."
                      : captchaScriptLoaded
                        ? "Complete the verification below."
                        : "Loading verification…"}
                  </p>

                  <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={siteKey}
                    size="compact"
                    asyncScriptOnLoad={() => {
                      setCaptchaScriptLoaded(true);
                      setCaptchaLoadError(null);
                    }}
                    onChange={(token) => {
                      setCaptchaToken(token);

                      if (token) {
                        setCaptchaLoadError(null);
                      }
                    }}
                    onExpired={() => {
                      setCaptchaToken(null);

                      setFeedback({
                        type: "error",
                        message: "Verification expired. Please verify again.",
                      });
                    }}
                    onErrored={() => {
                      setCaptchaToken(null);

                      setCaptchaLoadError(
                        "Verification could not load. Check your connection or content blocker. Reload this page if the problem continues.",
                      );
                    }}
                  />
                </>
              ) : (
                <div>
                  <p className="text-sm leading-6 text-muted">
                    Verification will load when you start filling out the form.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      requestCaptcha();
                      captchaGroupRef.current?.focus();
                    }}
                    className="mt-3 inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-4 py-2 text-sm font-medium hover:border-primary"
                  >
                    Load verification
                  </button>
                </div>
              )}
            </div>

            {captchaLoadError && (
              <p
                role="alert"
                className="mt-3 text-sm leading-6 text-red-600 dark:text-red-400"
              >
                {captchaLoadError}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-red-600 dark:text-red-400">
            The contact form is temporarily unavailable.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !siteKey}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle
                aria-hidden="true"
                className="h-5 w-5 motion-safe:animate-spin"
              />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
            </>
          )}
        </button>
      </fieldset>

      <div role="status" aria-live="polite" aria-atomic="true">
        {feedback && (
          <p
            className={`mt-5 rounded-xl border p-4 text-sm ${
              feedback.type === "success"
                ? "border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                : "border-red-500/30 text-red-600 dark:text-red-400"
            }`}
          >
            {feedback.message}
          </p>
        )}
      </div>
    </form>
  );
}
