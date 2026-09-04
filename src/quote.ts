const DAY = 86_400_000;
const CHINA_OFFSET = 8 * 60 * 60 * 1000;

export function quoteIndex(count: number, now = Date.now()): number {
  if (!Number.isInteger(count) || count < 1) throw new Error('请至少添加一条语录');
  const day = Math.floor((now + CHINA_OFFSET) / DAY);
  const start = Math.floor((Date.parse('2026-09-04T00:00:00+08:00') + CHINA_OFFSET) / DAY);
  return ((day - start) % count + count) % count;
}
