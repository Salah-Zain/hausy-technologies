import { describe, expect, it } from "vitest";
import { challengeSchema } from "@/lib/solution-finder.functions";

describe("business challenge validation", () => {
  it("accepts a 20-character challenge", () => {
    expect(challengeSchema.safeParse({ challenge: "Our orders take too long" }).success).toBe(true);
  });

  it("rejects descriptions shorter than 20 characters", () => {
    expect(challengeSchema.safeParse({ challenge: "Too short" }).success).toBe(false);
  });

  it("rejects descriptions longer than 1,200 characters", () => {
    expect(challengeSchema.safeParse({ challenge: "a".repeat(1201) }).success).toBe(false);
  });
});