import { describe, it, expect } from "vitest";
import { formatBytes } from "../src";

describe("formatBytes", () => {
  it("should format bytes less than 1 KB", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(512)).toBe("512.00 B");
  });

  it("should format KB values correctly", () => {
    expect(formatBytes(1024)).toBe("1.00 KB");
    expect(formatBytes(2048)).toBe("2.00 KB");
    expect(formatBytes(1536)).toBe("1.50 KB");
  });

  it("should format MB values correctly", () => {
    expect(formatBytes(1024 ** 2)).toBe("1.00 MB");
    expect(formatBytes(5 * 1024 ** 2)).toBe("5.00 MB");
  });

  it("should format GB values correctly", () => {
    expect(formatBytes(1024 ** 3)).toBe("1.00 GB");
    expect(formatBytes(3 * 1024 ** 3)).toBe("3.00 GB");
  });

  it("should handle bigint input", () => {
    expect(formatBytes(1024n ** 3n)).toBe("1.00 GB");
  });

  it("should handle string input", () => {
    expect(formatBytes("1024")).toBe("1.00 KB");
  });

  it("should respect fixedLength parameter", () => {
    expect(formatBytes(1536, 0)).toBe("2 KB");
    expect(formatBytes(1536, 3)).toBe("1.500 KB");
  });

  it("should throw error for negative input", () => {
    expect(() => formatBytes(-1024)).toThrow();
    expect(() => formatBytes(2.35 * 1024 ** 2)).toThrow();
  });

  it("should throw error for non-integer or invalid input", () => {
    expect(() => formatBytes("abc")).toThrow();
    expect(() => formatBytes(12.34 as any)).toThrow();
  });
});
