"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import { sendGTMEvent } from "@next/third-parties/google";

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

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

export default function ContactForm() {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

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
      setFeedback({
        type: "error",
        message: "Please complete the reCAPTCHA verification.",
      });
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          : "Something went wrong. Please try again.";

      if (!response.ok) {
        setFeedback({ type: "error", message });
        return;
      }

      // setFeedback({ type: "success", message });
      // reset();

      setFeedback({ type: "success", message });
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
        message: "Unable to send your message. Please try again.",
      });
    } finally {
      captchaRef.current?.reset();
      setCaptchaToken(null);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, () => setFeedback(null))}
      noValidate
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
          <div role="group" aria-label="Spam protection verification">
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={siteKey}
              size="compact"
              onChange={(token) => setCaptchaToken(token)}
              onExpired={() => {
                setCaptchaToken(null);
                setFeedback({
                  type: "error",
                  message: "Verification expired. Please verify again.",
                });
              }}
              onErrored={() => {
                setCaptchaToken(null);
                setFeedback({
                  type: "error",
                  message:
                    "Verification could not load. Check your connection and try again.",
                });
              }}
            />
          </div>
        ) : (
          <p className="text-sm text-red-600 dark:text-red-400">
            The contact form is temporarily unavailable.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !siteKey}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
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
