import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { inquirySchema, type InquiryFormValues } from "@/lib/inquiry-schema";
import { submitInquiry } from "@/lib/inquiry.functions";

type InquiryFormProps = {
  inquiryType?: "project" | "discovery-call";
  compact?: boolean;
};

const serviceOptions = [
  "AI Automation & Agents",
  "Custom Software & Internal Tools",
  "AI Integration with Existing Systems",
  "AI SEO & Digital Visibility",
  "Something Else / Not Sure Yet",
];

const initialValues: InquiryFormValues = {
  name: "",
  email: "",
  phone: "",
  service: "AI Automation & Agents",
  goals: "",
  company: "Not specified",
  budget: "Let’s discuss",
  inquiryType: "discovery-call",
  preferredTime: "",
};

export function InquiryForm({ inquiryType = "discovery-call", compact = false }: InquiryFormProps) {
  const sendInquiry = useServerFn(submitInquiry);
  const fieldId = (field: string) => `${inquiryType}-${field}`;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedContact, setSubmittedContact] = useState("");
  const [requestError, setRequestError] = useState("");
  const [service, setService] = useState(initialValues.service);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formValues = Object.fromEntries(new FormData(event.currentTarget).entries());
    const parsed = inquirySchema.safeParse({ ...formValues, service, inquiryType });
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
      setSubmittedContact(parsed.data.email || parsed.data.phone || "");
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
        <p>Your details are with our team. We’ll be in touch{submittedContact ? ` at ${submittedContact}` : " shortly"}.</p>
      </div>
    );
  }

  return (
    <form className={`inquiry-form${compact ? " inquiry-form-compact" : ""}`} onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <Field label="01. YOUR NAME" id={fieldId("name")} error={errors["name"]} wide>
          <input
            id={fieldId("name")}
            name="name"
            autoComplete="name"
            defaultValue={initialValues.name}
            onChange={() => setErrors((current) => ({ ...current, name: "" }))}
            maxLength={100}
            placeholder="What should we call you?"
            aria-invalid={Boolean(errors["name"])}
          />
        </Field>

        <Field label="02. EMAIL ADDRESS" id={fieldId("email")} error={errors["email"]}>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            defaultValue={initialValues.email}
            onChange={() => setErrors((current) => ({ ...current, email: "" }))}
            maxLength={254}
            placeholder="you@company.com"
            aria-invalid={Boolean(errors["email"])}
          />
        </Field>

        <Field label="03. PHONE / WHATSAPP (OPTIONAL)" id={fieldId("phone")} error={errors["phone"]}>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={initialValues.phone}
            onChange={() => setErrors((current) => ({ ...current, phone: "" }))}
            maxLength={30}
            placeholder="+91 00000 00000"
            aria-invalid={Boolean(errors["phone"])}
          />
        </Field>

        <Field label="04. WHAT DO YOU NEED HELP WITH?" id={fieldId("service")} error={errors["service"]} wide>
          <Select
            name="service"
            value={service}
            onValueChange={(val) => {
              setService(val);
              setErrors((current) => ({ ...current, service: "" }));
            }}
          >
            <SelectTrigger
              id={fieldId("service")}
              className="form-custom-select-trigger"
              aria-invalid={Boolean(errors["service"])}
            >
              <SelectValue placeholder="Select what you need help with" />
            </SelectTrigger>
            <SelectContent className="form-custom-select-content" position="popper" sideOffset={6}>
              {serviceOptions.map((opt) => (
                <SelectItem key={opt} value={opt} className="form-custom-select-item">
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="05. TELL US ABOUT YOUR CHALLENGE (OPTIONAL)" id={fieldId("goals")} error={errors["goals"]} wide>
          <textarea
            id={fieldId("goals")}
            name="goals"
            rows={3}
            defaultValue={initialValues.goals}
            onChange={() => setErrors((current) => ({ ...current, goals: "" }))}
            maxLength={2000}
            placeholder="What's slowing your business down? What are you trying to build, improve, or automate?"
            aria-invalid={Boolean(errors["goals"])}
          />
        </Field>
      </div>

      {requestError && <p className="form-request-error" role="alert">{requestError}</p>}

      <Button type="submit" disabled={submitting} className="button-lime form-submit">
        {submitting ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : null}
        <span>{submitting ? "CONNECTING..." : "LET'S CONNECT"}</span>
        {!submitting && <ArrowRight className="btn-arrow" aria-hidden="true" />}
      </Button>

      <p className="form-privacy">Your details stay with Hausy. We'll only use them to follow up about your enquiry.</p>
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
