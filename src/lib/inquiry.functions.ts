import { createServerFn } from "@tanstack/react-start";
import { inquirySchema } from "@/lib/inquiry-schema";

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((input) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("project_inquiries").insert({
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone || null,
      service: data.service,
      budget: data.budget,
      goals: data.goals,
      inquiry_type: data.inquiryType,
      preferred_time: data.preferredTime || null,
    });

    if (error) {
      throw new Error("Your request could not be saved. Please try again.");
    }

    return { ok: true };
  });