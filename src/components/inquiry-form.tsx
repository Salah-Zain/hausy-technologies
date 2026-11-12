import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inquirySchema, type InquiryFormValues } from "@/lib/inquiry-schema";
import { submitInquiry } from "@/lib/inquiry.functions";

type InquiryFormProps = {
  inquiryType?: "project" | "discovery-call";
  compact?: boolean;
};

const services = [
  "AI automation",
  "Custom software",
  "E-commerce",
  "AI SEO",
  "Not sure yet",
];

const budgets = [
  "Under ₹50,000",
  "₹50,000 – ₹2 lakh",
  "₹2 lakh – ₹5 lakh",
  "₹5 lakh – ₹10 lakh",
  "₹10 lakh+",
  "Let’s discuss",
];

const initialValues: InquiryFormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "AI automation",
  budget: "Let’s discuss",
  goals: "",
  inquiryType: "project",
  preferredTime: "",
};

export function InquiryForm({ inquiryType = "project", compact = false }: InquiryFormProps) {
  const sendInquiry = useServerFn(submitInquiry);
  const fieldId = (field: string) => `${inquiryType}-${field}`;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [requestError, setRequestError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formValues = Object.fromEntries(new FormData(event.currentTarget).entries());
    const parsed = inquirySchema.safeParse({ ...formValues, inquiryType });
    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      document.getElementById(fieldId(Object.keys(nextErrors)[0] ?? "name"))?.focus();
      return;
    }

    setSubmitting(true);
    setRequestError("");
    try {
      await sendInquiry({ data: parsed.data });
      setSubmittedEmail(parsed.data.email);
      setSubmitted(true);
    } catch {
      setRequestError("We couldn’t save your request. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="inquiry-success" role="status" aria-live="polite">
        <span className="success-icon"><Check aria-hidden="true" /></span>
        <span className="eyebrow">REQUEST RECEIVED</span>
        <h3>THANKS. LET’S BUILD WHAT’S NEXT.</h3>
        <p>Your details are with our team. We’ll be in touch at {submittedEmail}.</p>
      </div>
    );
  }

  return (
    <form className={`inquiry-form${compact ? " inquiry-form-compact" : ""}`} onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <Field label="YOUR NAME" id={fieldId("name")} error={errors["name"]}>
          <input id={fieldId("name")} name="name" autoComplete="name" defaultValue={initialValues.name} onChange={(event) => setErrors((current) => ({ ...current, name: event.currentTarget.value ? "" : current["name"] ?? "" }))} maxLength={100} placeholder="How should we address you?" aria-invalid={Boolean(errors["name"])} />
        </Field>
        <Field label="WORK EMAIL" id={fieldId("email")} error={errors["email"]}>
          <input id={fieldId("email")} name="email" type="email" inputMode="email" autoComplete="email" defaultValue={initialValues.email} onChange={() => setErrors((current) => ({ ...current, email: "" }))} maxLength={254} placeholder="you@company.com" aria-invalid={Boolean(errors["email"])} />
        </Field>
        <Field label="COMPANY" id={fieldId("company")} error={errors["company"]}>
          <input id={fieldId("company")} name="company" autoComplete="organization" defaultValue={initialValues.company} onChange={() => setErrors((current) => ({ ...current, company: "" }))} maxLength={120} placeholder="Your business name" aria-invalid={Boolean(errors["company"])} />
        </Field>
        <Field label="PHONE (OPTIONAL)" id={fieldId("phone")} error={errors["phone"]}>
          <input id={fieldId("phone")} name="phone" type="tel" autoComplete="tel" defaultValue={initialValues.phone} maxLength={30} placeholder="+91 00000 00000" aria-invalid={Boolean(errors["phone"])} />
        </Field>
        <Field label="WHAT ARE YOU LOOKING TO BUILD?" id={fieldId("service")} error={errors["service"]}>
          <select id={fieldId("service")} name="service" defaultValue={initialValues.service} onChange={() => setErrors((current) => ({ ...current, service: "" }))} aria-invalid={Boolean(errors["service"])}>
            {services.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
        </Field>
        <Field label="PROJECT BUDGET" id={fieldId("budget")} error={errors["budget"]}>
          <select id={fieldId("budget")} name="budget" defaultValue={initialValues.budget} onChange={() => setErrors((current) => ({ ...current, budget: "" }))} aria-invalid={Boolean(errors["budget"])}>
            {budgets.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
          </select>
        </Field>
        {inquiryType === "discovery-call" && (
          <Field label="A GOOD TIME TO REACH YOU" id={fieldId("time")} error={errors["preferredTime"]}>
          <input id={fieldId("time")} name="preferredTime" defaultValue={initialValues.preferredTime} maxLength={160} placeholder="e.g. weekday afternoons" aria-invalid={Boolean(errors["preferredTime"])} />
          </Field>
        )}
        <Field label="WHAT WOULD A GREAT OUTCOME LOOK LIKE?" id={fieldId("goals")} error={errors["goals"]} wide>
          <textarea id={fieldId("goals")} name="goals" rows={4} defaultValue={initialValues.goals} onChange={() => setErrors((current) => ({ ...current, goals: "" }))} maxLength={2000} minLength={20} placeholder="Tell us what’s slowing your business down or what you want to make possible." aria-invalid={Boolean(errors["goals"])} />
        </Field>
      </div>
      {requestError && <p className="form-request-error" role="alert">{requestError}</p>}
      <Button type="submit" disabled={submitting} className="button-lime form-submit">
        {submitting ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : null}
        {submitting ? "SENDING REQUEST" : inquiryType === "discovery-call" ? "REQUEST A DISCOVERY CALL" : "SEND PROJECT INQUIRY"}
        {!submitting && <ArrowRight aria-hidden="true" />}
      </Button>
      <p className="form-privacy">Your details stay with Hausy. We’ll only use them to follow up about your request.</p>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  wide = false,
  children,
}: {
  label: string;
  id: string;
  error?: string | undefined;
  wide?: boolean;
  children: React.ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div className={`form-field${wide ? " form-field-wide" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span id={errorId} className="field-error">{error}</span>}
    </div>
  );
}