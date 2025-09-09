import { describe, it, expect } from "vitest";
import { sayHello } from "../src";

describe("sayHello", () => {
  it('should return "Hello, World!"', () => {
    expect(sayHello()).toBe("Hello, World!");
  });
});
