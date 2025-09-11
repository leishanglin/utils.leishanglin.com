/**
 * 将字节（Bytes）转换为最合适的单位，比如：4 KB，2.35 MB
 * @param bytes 需要转换的字节数，必须是正整数，否则会报错
 * @param fixedLength 固定的小数位数（默认2位）
 * @returns 4 KB，2.35 MB，5.00 GB ...
 */
export const formatBytes = (
  bytes: string | bigint | number,
  fixedLength = 2,
) => {
  try {
    bytes = BigInt(bytes);
    if (bytes < 0n) {
      throw new Error();
    }
  } catch {
    throw new Error(
      "转换为 BigInt 时报错，字节数（Bytes）只能是大于 0 且 小于 Infinity 的整数",
    );
  }

  if (bytes === 0n) {
    return "0 B";
  }

  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const K = 1024n;
  let i = 0n;
  const originBytes = bytes;
  while (bytes >= K && i < sizes.length - 1) {
    bytes /= K;
    i++;
  }

  const intPart = bytes;
  const level = K ** i;
  const decimalPart = originBytes - level * intPart;
  const num = Number(intPart) + Number((decimalPart * 1000n) / level) / 1000;

  if (num > Number.MAX_SAFE_INTEGER) {
    throw new Error(
      `你输入的字节数超过了最大单位（${
        sizes[sizes.length - 1]
      }）可表示的最大安全整数范围（Number.MAX_SAFE_INTEGER），这会导致返回的的数不准`,
    );
  }

  return `${num.toFixed(fixedLength)} ${sizes[Number(i)]}`;
};
