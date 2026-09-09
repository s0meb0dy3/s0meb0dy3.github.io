import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const html = readFileSync('dist/index.html', 'utf8');
const ids = ['who-am-i'];
let previous = -1;
for (const id of ids) {
  const position = html.indexOf(`href="${base}/posts/${id}/"`);
  assert(position > previous, `${id}: missing link or incorrect date order`);
  previous = position;
  const article = readFileSync(`dist/posts/${id}/index.html`, 'utf8');
  assert.equal(article.includes('示例文章'), id !== 'who-am-i');
  if (id === 'who-am-i') {
    assert(article.includes('愿我们都可以找到'));
    assert(article.includes('<ol>'));
    assert(article.includes('观影'));
    assert(!article.includes('写于此，留待以后'));
    assert(html.includes('class="post-category">观影</span>'));
  }
}
assert(html.includes(`href="${base}/about/"`));
const about = readFileSync('dist/about/index.html', 'utf8');
assert(about.includes('Peter Yao'));
assert(about.includes('Find me'));
assert(about.includes('github.com/s0meb0dy3'));
assert(about.includes('yzoziyi103@hotmail.com'));
console.log('Passed: all pages, article order, sample labels and base-prefixed links.');

const { quoteIndex } = await import('../src/quote.ts');
assert.equal(quoteIndex(3, Date.parse('2026-09-04T00:00:00+08:00')), 0);
assert.equal(quoteIndex(3, Date.parse('2026-09-04T23:59:59+08:00')), 0);
assert.equal(quoteIndex(3, Date.parse('2026-09-05T00:00:00+08:00')), 1);
assert.equal(quoteIndex(3, Date.parse('2026-09-07T00:00:00+08:00')), 0);
assert.equal(quoteIndex(9, Date.parse('2026-09-12T00:00:00+08:00')), 8);
assert.equal(quoteIndex(9, Date.parse('2026-09-13T00:00:00+08:00')), 0);
assert.equal(quoteIndex(1), 0);
assert.throws(() => quoteIndex(0));
assert(html.includes('凡事往简单处想，往认真处行。'));
console.log('Passed: daily quote, Beijing midnight, wraparound and single-entry record.');
