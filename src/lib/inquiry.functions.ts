import { createServerFn } from "@tanstack/react-start";
import { inquirySchema } from "@/lib/inquiry-schema";

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((input) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const contactEmail =
      data.email && data.email.length > 0
        ? data.email
        : `${(data.phone || "user").replace(/[^0-9a-zA-Z]/g, "") || "inquiry"}@phone.hausy.tech`;

    const { error } = await supabaseAdmin.from("project_inquiries").insert({
      name: data.name,
      email: contactEmail,
      company: data.company || "Not specified",
      phone: data.phone || null,
      service: data.service,
      budget: data.budget || "Let’s discuss",
      goals: data.goals || "Discovery call request",
      inquiry_type: data.inquiryType,
      preferred_time: data.preferredTime || null,
    });

    if (error) {
      throw new Error("Your request could not be saved. Please try again.");
    }

    return { ok: true };
  });
