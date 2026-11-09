import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  company: z.string().trim().min(2, "Please enter your company name.").max(120),
  phone: z.string().trim().max(30).optional().default(""),
  service: z.enum([
    "AI automation",
    "Custom software",
    "E-commerce",
    "AI SEO",
    "Not sure yet",
  ]),
  budget: z.enum([
    "Under ₹50,000",
    "₹50,000 – ₹2 lakh",
    "₹2 lakh – ₹5 lakh",
    "₹5 lakh – ₹10 lakh",
    "₹10 lakh+",
    "Let’s discuss",
  ]),
  goals: z.string().trim().min(20, "Share a little more about what you want to achieve.").max(2000),
  inquiryType: z.enum(["project", "discovery-call"]),
  preferredTime: z.string().trim().max(160).optional().default(""),
});

export type InquiryFormValues = z.input<typeof inquirySchema>;