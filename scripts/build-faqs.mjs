#!/usr/bin/env node
/**
 * Injects FAQ accordion HTML + FAQPage JSON-LD from data/faqs.json.
 * Single source of truth: edit data/faqs.json, then run npm run build:faqs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = path.join(root, 'data', 'faqs.json');
const { pages } = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderFaqList(items) {
  const rows = items.map((item) => {
    const answerInner = item.answerHtml ?? escapeHtml(item.answer);
    return [
      '                    <details class="faq-item">',
      '                        <summary class="faq-item__summary">',
      `                            <span class="faq-item__question">${escapeHtml(item.question)}</span>`,
      '                            <svg class="icon-svg faq-item__icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>',
      '                        </summary>',
      '                        <div class="faq-item__panel">',
      `                            <p class="font-body-lg text-body-lg">${answerInner}</p>`,
      '                        </div>',
      '                    </details>',
    ].join('\n');
  });

  return [
    '<!-- faq-list:start -->',
    '                <div class="faq-list">',
    ...rows,
    '                </div>',
    '<!-- faq-list:end -->',
  ].join('\n');
}

function buildFaqPageNode(page) {
  const questions = page.items.map((item) => item.question);
  const dupes = questions.filter((q, i) => questions.indexOf(q) !== i);
  if (dupes.length) {
    throw new Error(`Duplicate questions in ${page.key}: ${dupes.join(', ')}`);
  }

  return {
    '@type': 'FAQPage',
    '@id': page.faqId,
    mainEntity: page.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/** Serialize JSON-LD safely for embedding in <script> (escape <). */
function serializeJsonLd(data) {
  return JSON.stringify(data, null, 2).replaceAll('<', '\\u003c');
}

function isFaqPageNode(node) {
  const t = node?.['@type'];
  if (t === 'FAQPage') return true;
  return Array.isArray(t) && t.includes('FAQPage');
}

function upsertFaqInLdJson(rawJson, page) {
  const data = JSON.parse(rawJson);
  const faqNode = buildFaqPageNode(page);

  if (Array.isArray(data['@graph'])) {
    const graph = data['@graph'].filter((node) => !isFaqPageNode(node));
    if (page.includeSchema) graph.push(faqNode);
    return { ...data, '@graph': graph };
  }

  // Single top-level entity (Service / WebPage / …): wrap into @graph.
  if (page.includeSchema) {
    const { '@context': ctx, ...rest } = data;
    if (isFaqPageNode(data)) {
      return { '@context': ctx ?? 'https://schema.org', ...faqNode };
    }
    return {
      '@context': ctx ?? 'https://schema.org',
      '@graph': [rest, faqNode],
    };
  }

  // includeSchema false: drop FAQPage if this script was only FAQPage
  if (isFaqPageNode(data)) return null;
  return data;
}

function replaceFaqList(html, listHtml) {
  if (html.includes('<!-- faq-list:start -->') && html.includes('<!-- faq-list:end -->')) {
    return html.replace(
      /<!-- faq-list:start -->[\s\S]*?<!-- faq-list:end -->/,
      listHtml
    );
  }

  // First-time wrap: replace the existing <div class="faq-list">…</div> block.
  const marker = '<div class="faq-list">';
  const start = html.indexOf(marker);
  if (start === -1) {
    throw new Error('Could not find .faq-list to inject');
  }

  let depth = 0;
  let i = start;
  let end = -1;
  while (i < html.length) {
    const nextOpen = html.indexOf('<div', i);
    const nextClose = html.indexOf('</div>', i);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 4;
      continue;
    }
    depth -= 1;
    i = nextClose + 6;
    if (depth === 0) {
      end = i;
      break;
    }
  }
  if (end === -1) throw new Error('Unbalanced faq-list div');
  return html.slice(0, start) + listHtml + html.slice(end);
}

function updateJsonLd(html, page) {
  const re = /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g;
  const matches = [...html.matchAll(re)];

  if (!page.includeSchema) {
    // Ensure homepage (or any non-schema page) has no FAQPage block.
    let out = html;
    for (const m of matches) {
      try {
        const parsed = JSON.parse(m[1]);
        const hasFaq =
          isFaqPageNode(parsed) ||
          (Array.isArray(parsed['@graph']) && parsed['@graph'].some(isFaqPageNode));
        if (!hasFaq) continue;
        if (isFaqPageNode(parsed) && !parsed['@graph']) {
          out = out.replace(m[0], '');
          continue;
        }
        if (Array.isArray(parsed['@graph'])) {
          const graph = parsed['@graph'].filter((n) => !isFaqPageNode(n));
          const next = { ...parsed, '@graph': graph };
          const block = `<script type="application/ld+json">\n    ${serializeJsonLd(next)}\n    </script>`;
          out = out.replace(m[0], block);
        }
      } catch {
        // leave invalid blocks alone; validation step will report
      }
    }
    return out;
  }

  if (matches.length === 0) {
    // Insert a dedicated FAQPage script before favicon links.
    const block = `    <script type="application/ld+json">\n    ${serializeJsonLd({
      '@context': 'https://schema.org',
      ...buildFaqPageNode(page),
    })}\n    </script>\n\n`;
    return html.replace(/<link rel="icon"/, `${block}    <link rel="icon"`);
  }

  // Prefer updating the first ld+json that already has FAQPage or @graph / Service / WebPage.
  let updated = false;
  let out = html;
  for (const m of matches) {
    try {
      const parsed = JSON.parse(m[1]);
      const touchesFaq =
        isFaqPageNode(parsed) ||
        Array.isArray(parsed['@graph']) ||
        ['Service', 'WebPage', 'ContactPage', 'CollectionPage'].includes(parsed['@type']) ||
        (Array.isArray(parsed['@type']) &&
          parsed['@type'].some((t) =>
            ['Service', 'WebPage', 'ContactPage', 'CollectionPage'].includes(t)
          ));
      if (!touchesFaq && matches.length > 1) continue;

      const next = upsertFaqInLdJson(m[1], page);
      if (next === null) {
        out = out.replace(m[0], '');
      } else {
        const block = `<script type="application/ld+json">\n    ${serializeJsonLd(next)}\n    </script>`;
        out = out.replace(m[0], block);
      }
      updated = true;
      break;
    } catch {
      continue;
    }
  }

  if (!updated) {
    throw new Error(`Could not update JSON-LD for ${page.key}`);
  }
  return out;
}

let ok = 0;
for (const page of pages) {
  const filePath = path.join(root, page.file);
  let html = fs.readFileSync(filePath, 'utf8');
  html = replaceFaqList(html, renderFaqList(page.items));
  html = updateJsonLd(html, page);
  fs.writeFileSync(filePath, html);
  ok += 1;
  console.log(
    `✓ ${page.file} (${page.items.length} FAQ${page.includeSchema ? ' + FAQPage' : ', no schema'})`
  );
}

console.log(`Injected FAQs into ${ok} pages from data/faqs.json`);
