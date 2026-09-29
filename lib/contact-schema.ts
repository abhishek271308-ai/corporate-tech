import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter at least 2 characters.")
    .max(80, "Name is too long."),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address.")
    .max(254, "Email is too long."),

  company: z.string().trim().max(100, "Company name is too long."),

  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more—at least 20 characters.")
    .max(3000, "Keep your message under 3,000 characters."),
});

export type ContactValues = z.infer<typeof contactSchema>;
