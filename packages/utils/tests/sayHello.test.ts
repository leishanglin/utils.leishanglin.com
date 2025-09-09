import { describe, it, expect } from "vitest";
import { sayHello } from "../src";

describe("utils test", () => {
  it('sayHello should return "Hello, World!"', () => {
    expect(sayHello()).toBe("Hello, World!");
  });
});
