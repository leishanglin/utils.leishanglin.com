/**
 * 遍历每一个节点时，都会触发的回调函数
 * @param node 当前节点
 * @param index 当前节点所在数组的位置下标
 * @param list 当前节点所在的数组
 * @param parent 当前节点的父节点
 * @returns true: 中止遍历，false 或 void：继续遍历
 */
export interface TraverseCallback<T> {
  (node: T, index: number, list: T[], parent: T | null): boolean | void;
}

export type TraverseMode = "DFS" | "BFS";

/**
 * 一个兼容 BFS 和 DFS 的 traverse
 * @param callback 节点处理函数，返回 true 时会中止遍历
 * @returns 处理后的 treeData
 */
export const traverse = <T extends { children?: T[] }>(
  treeData: T[],
  callback: TraverseCallback<T>,
  mode: TraverseMode = "DFS",
) => {
  const isBFS = mode === "BFS";

  // 栈或队列（BFS 用队列，DFS 用栈）
  const stackOrQueue: {
    node: T;
    index: number;
    list: T[];
    parent: T | null;
  }[] = treeData
    .map((node, index) => ({
      node,
      index,
      list: treeData,
      parent: null,
    }))
    [!isBFS ? "reverse" : "slice"]();

  while (stackOrQueue.length > 0) {
    // 取出当前节点（BFS 用 shift，DFS 用 pop）
    const { node, index, list, parent } = isBFS
      ? stackOrQueue.shift()!
      : stackOrQueue.pop()!;

    // 执行回调，允许回调终止遍历
    if (callback(node, index, list, parent)) {
      return treeData;
    }

    // 获取子节点数组
    // 需要在 callback 之后执行，因为 callback 可能会改变 children
    const children = node.children || [];

    // 根据模式处理子节点
    const childNodes = children.map((child, index) => ({
      node: child,
      index,
      list: children,
      parent: node,
    }));

    if (isBFS) {
      stackOrQueue.push(...childNodes);
    } else {
      stackOrQueue.push(...childNodes.reverse());
    }
  }

  return treeData;
};
