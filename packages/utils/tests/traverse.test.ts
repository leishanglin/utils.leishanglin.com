import { describe, it, expect } from "vitest";
import { traverse } from "../src/traverse";

interface Node {
  id: number;
  children?: Node[];
}

const sampleTree: Node[] = [
  {
    id: 1,
    children: [
      { id: 2 },
      {
        id: 3,
        children: [{ id: 4 }, { id: 5 }],
      },
    ],
  },
  {
    id: 6,
    children: [{ id: 7 }],
  },
];

describe("traverse", () => {
  it("should traverse in DFS order", () => {
    const visited: number[] = [];
    traverse<Node>(
      sampleTree,
      (node) => {
        visited.push(node.id);
      },
      "DFS",
    );

    // DFS 前序顺序: 1 → 2 → 3 → 4 → 5 → 6 → 7
    expect(visited).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("should traverse in BFS order", () => {
    const visited: number[] = [];
    traverse<Node>(
      sampleTree,
      (node) => {
        visited.push(node.id);
      },
      "BFS",
    );

    // BFS 顺序: 1 → 6 → 2 → 3 → 7 → 4 → 5
    expect(visited).toEqual([1, 6, 2, 3, 7, 4, 5]);
  });

  it("should handle empty tree", () => {
    const visited: number[] = [];
    const result = traverse<Node>(
      [],
      (node) => {
        visited.push(node.id);
      },
      "DFS",
    );

    expect(result).toEqual([]);
    expect(visited).toEqual([]);
  });

  it("should stop traversal when callback returns true", () => {
    const visited: number[] = [];
    traverse<Node>(
      sampleTree,
      (node) => {
        visited.push(node.id);
        return node.id === 3; // 遍历到 3 就中止
      },
      "DFS",
    );

    expect(visited).toEqual([1, 2, 3]); // 在 3 停止
  });

  it("should pass correct parent to callback", () => {
    const calls: Array<{ id: number; parentId: number | null }> = [];
    traverse<Node>(
      sampleTree,
      (node, _i, _list, parent) => {
        calls.push({
          id: node.id,
          parentId: parent ? parent.id : null,
        });
      },
      "DFS",
    );

    expect(calls).toContainEqual({ id: 1, parentId: null });
    expect(calls).toContainEqual({ id: 2, parentId: 1 });
    expect(calls).toContainEqual({ id: 3, parentId: 1 });
    expect(calls).toContainEqual({ id: 4, parentId: 3 });
    expect(calls).toContainEqual({ id: 5, parentId: 3 });
    expect(calls).toContainEqual({ id: 6, parentId: null });
    expect(calls).toContainEqual({ id: 7, parentId: 6 });
  });
});
