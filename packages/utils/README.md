---
title: "@leishanglin/utils"
keywords: "leishanglin,javascript,工具函数库,npm"
description: "leishanglin 的 JavaScript 工具函数包，浏览器和 Node 通用"
author: "leishanglin"
authorUrl: "https://cv.leishanglin.com"
datePublished: "2025-09-24"
domain: "https://utils.leishanglin.com"
githubUrl: "https://github.com/leishanglin/utils.leishanglin.com"
---

leishanglin 的 JavaScript 工具函数包，浏览器和 Node 通用。使用 [tsup](https://github.com/egoist/tsup) 构建，单元测试覆盖率 100%；

## 安装

```sh
pnpm add @leishanglin/utils
```

## 使用

```js
import { formatBytes } from "@leishanglin/utils";
```

## 简介

- [formatBytes](https://github.com/leishanglin/utils.leishanglin.com/blob/main/packages/utils/src/formatBytes.ts)：将字节（Bytes）转换为最合适的单位，比如：4 KB，2.35 MB
- [traverse](https://github.com/leishanglin/utils.leishanglin.com/blob/main/packages/utils/src/traverse.ts)：遍历 children 树，支持 BFS 和 DFS