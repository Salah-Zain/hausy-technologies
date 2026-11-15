import { z } from "zod";

const validServices = [
  "AI Automation & Agents",
  "Custom Software & Internal Tools",
  "AI Integration with Existing Systems",
  "AI SEO & Digital Visibility",
  "Something Else / Not Sure Yet",
  "AI automation",
  "Custom software",
  "E-commerce",
  "AI SEO",
  "Not sure yet",
] as const;

const validBudgets = [
  "Under ₹50,000",
  "₹50,000 – ₹2 lakh",
  "₹2 lakh – ₹5 lakh",
  "₹5 lakh – ₹10 lakh",
  "₹10 lakh+",
  "Let’s discuss",
] as const;

export const inquirySchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name.").max(100),
    email: z.string().trim().max(254).optional().default(""),
    phone: z.string().trim().max(30).optional().default(""),
    company: z.string().trim().max(120).optional().default("Not specified"),
    service: z.string().trim().refine((val) => validServices.includes(val as any), {
      message: "Please select what you need help with.",
    }),
    budget: z
      .string()
      .trim()
      .optional()
      .default("Let’s discuss")
      .refine((val) => !val || validBudgets.includes(val as any), {
        message: "Please choose an estimated budget.",
      }),
    goals: z.string().trim().max(2000).optional().default(""),
    inquiryType: z.enum(["project", "discovery-call"]).default("discovery-call"),
    preferredTime: z.string().trim().max(160).optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.email && data.email.length > 0) {
      const emailParse = z.string().email().safeParse(data.email);
      if (!emailParse.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter a valid email address.",
          path: ["email"],
        });
      }
    }

    const hasEmail = Boolean(data.email && data.email.length > 0);
    const hasPhone = Boolean(data.phone && data.phone.length > 0);
    if (!hasEmail && !hasPhone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide either an email or a phone / WhatsApp number.",
        path: ["phone"],
      });
    }

    if (data.inquiryType === "project") {
      if (!data.goals || data.goals.length < 20) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Share a little more about what you want to achieve.",
          path: ["goals"],
        });
      }
    }
  });

export type InquiryFormValues = z.input<typeof inquirySchema>;
