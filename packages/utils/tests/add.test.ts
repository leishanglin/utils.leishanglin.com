import { describe, it, expect } from "vitest";
import { add } from "../src";

describe("add", () => {
  it("should return 3", () => {
    expect(add(1, 2)).toBe(3);
  });
});
