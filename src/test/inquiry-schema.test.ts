import { describe, expect, it } from "vitest";
import { inquirySchema } from "@/lib/inquiry-schema";

describe("project inquiry validation", () => {
  it("accepts values read directly from a submitted form", () => {
    const formValues = Object.fromEntries(new FormData(Object.assign(document.createElement("form"), {
      innerHTML: '<input name="name" value="Sam Taylor"><input name="email" value="sam@example.com"><input name="company" value="Example Works"><select name="service"><option selected>AI automation</option></select><select name="budget"><option selected>Let’s discuss</option></select><textarea name="goals">We want to automate order updates for our growing customer team.</textarea>',
    })).entries());
    const result = inquirySchema.safeParse({ ...formValues, inquiryType: "project" });

    expect(result.success).toBe(true);
  });

  it("accepts a complete project inquiry with a valid budget and contact email", () => {
    const result = inquirySchema.safeParse({
      name: "Sam Taylor",
      email: "sam@example.com",
      company: "Example Works",
      phone: "",
      service: "AI automation",
      budget: "Let’s discuss",
      goals: "We want to automate order updates for our growing customer team.",
      inquiryType: "project",
    });

    expect(result.success).toBe(true);
  });

  it("rejects missing goals and an invalid contact email", () => {
    const result = inquirySchema.safeParse({
      name: "Sam Taylor",
      email: "not-an-email",
      company: "Example Works",
      service: "AI automation",
      budget: "Let’s discuss",
      goals: "",
      inquiryType: "project",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.path[0])).toEqual(["email", "goals"]);
    }
  });

  it("rejects a budget choice that is not in the inquiry form options", () => {
    const result = inquirySchema.safeParse({
      name: "Sam Taylor",
      email: "sam@example.com",
      company: "Example Works",
      service: "AI automation",
      budget: "unlimited",
      goals: "We want to automate order updates for our growing customer team.",
      inquiryType: "project",
    });

    expect(result.success).toBe(false);
  });
});