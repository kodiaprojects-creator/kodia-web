#!/usr/bin/env node
/**
 * Sync shared header/footer from partials/ into every index.html.
 * Usage: node scripts/sync-chrome.mjs [--check]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checkOnly = process.argv.includes('--check');

const HEADER_MARK_START = '<!-- site-header:start -->';
const HEADER_MARK_END = '<!-- site-header:end -->';
const FOOTER_MARK_START = '<!-- site-footer:start -->';
const FOOTER_MARK_END = '<!-- site-footer:end -->';

const GROUP_PATHS = {
  serveis: [
    '/web-one-page/',
    '/web-corporativa/',
    '/manteniment-web/',
    '/web-a-mida/',
    '/revisio-digital/',
    '/web-per-a-autonoms/',
    '/web-per-a-comercos/',
    '/web-per-a-oficis/',
  ],
  zones: ['/disseny-web-banyoles/', '/disseny-web-girona/'],
};

function readPartial(name) {
  return fs.readFileSync(path.join(root, 'partials', name), 'utf8').trim() + '\n';
}

function walkIndexHtml(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'docs', 'partials', '.git'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkIndexHtml(full, out);
    else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

function pagePathFromFile(file) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  return '/' + rel.replace(/\/index\.html$/, '/');
}

function resolveHomeHrefs(html, isHome) {
  return html.replace(
    /(<a\b[^>]*?)\s+href="([^"]*)"([^>]*?)\s+data-home-href="([^"]*)"([^>]*>)/g,
    (_m, pre, href, mid, homeHref, post) => {
      const finalHref = isHome ? homeHref : href;
      return `${pre} href="${finalHref}"${mid}${post}`;
    }
  );
}

function stripHomeHrefAttrs(html) {
  return html.replace(/\s+data-home-href="[^"]*"/g, '');
}

function toggleClass(attrs, className, on) {
  if (/\sclass="[^"]*"/.test(attrs)) {
    return attrs.replace(/\sclass="([^"]*)"/, (_m, classes) => {
      const list = classes.split(/\s+/).filter((c) => c && c !== className);
      if (on) list.push(className);
      return ` class="${list.join(' ')}"`;
    });
  }
  if (on) return `${attrs} class="${className}"`;
  return attrs;
}

function markCurrent(html, pagePath) {
  html = html.replace(/<a\b([^>]*)>/g, (full, attrs) => {
    const m = attrs.match(/\sdata-nav-path="([^"]*)"/);
    if (!m) return full;
    const isCurrent = m[1] === pagePath;
    let next = attrs.replace(/\s+aria-current="page"/g, '');
    if (isCurrent) next += ' aria-current="page"';
    return `<a${next}>`;
  });

  for (const [group, paths] of Object.entries(GROUP_PATHS)) {
    const active = paths.includes(pagePath);
    html = html.replace(
      new RegExp(`<(button|details)\\b([^>]*\\sdata-nav-group="${group}"[^>]*)>`, 'g'),
      (_full, tag, attrs) => `<${tag}${toggleClass(attrs, 'is-current', active)}>`
    );
  }

  return html;
}

function ensureNavScript(html) {
  if (html.includes('/js/nav.js')) return html;
  if (html.includes('/js/form.js')) {
    return html.replace(
      '<script src="/js/form.js" defer></script>',
      '<script src="/js/nav.js" defer></script>\n<script src="/js/form.js" defer></script>'
    );
  }
  return html.replace('</body>', '<script src="/js/nav.js" defer></script>\n</body>');
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceOrWrap(html, startMark, endMark, block, tagName) {
  const wrapped = block.trim();
  if (html.includes(startMark) && html.includes(endMark)) {
    const re = new RegExp(`${escapeRe(startMark)}[\\s\\S]*?${escapeRe(endMark)}`, 'm');
    return html.replace(re, wrapped);
  }

  const tagRe = new RegExp(`<${tagName}\\b[\\s\\S]*?<\\/${tagName}>`, 'i');
  if (!tagRe.test(html)) {
    throw new Error(`Could not find <${tagName}> to wrap`);
  }
  return html.replace(tagRe, wrapped);
}

function buildHeaderForPage(baseHeader, pagePath) {
  const isHome = pagePath === '/';
  let h = resolveHomeHrefs(baseHeader, isHome);
  h = stripHomeHrefAttrs(h);
  h = markCurrent(h, pagePath);
  return h;
}

function syncFile(file, baseHeader, baseFooter) {
  const pagePath = pagePathFromFile(file);
  let html = fs.readFileSync(file, 'utf8');
  const header = buildHeaderForPage(baseHeader, pagePath);
  const footer = baseFooter;

  html = replaceOrWrap(html, HEADER_MARK_START, HEADER_MARK_END, header, 'header');
  html = replaceOrWrap(html, FOOTER_MARK_START, FOOTER_MARK_END, footer, 'footer');
  html = ensureNavScript(html);

  html = html.replaceAll('href="/politica-de-privacitat"', 'href="/politica-de-privacitat/"');
  html = html.replaceAll('href="/avis-legal"', 'href="/avis-legal/"');
  html = html.replaceAll('href="/politica-de-galetes"', 'href="/politica-de-galetes/"');

  return html;
}

const baseHeader = readPartial('header.html');
const baseFooter = readPartial('footer.html');
const files = walkIndexHtml(root);
let changed = 0;
let errors = 0;

for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  let after;
  try {
    after = syncFile(file, baseHeader, baseFooter);
  } catch (err) {
    console.error(`✗ ${path.relative(root, file)}: ${err.message}`);
    errors += 1;
    continue;
  }

  if (before === after) {
    console.log(`· ${path.relative(root, file)}`);
    continue;
  }

  if (checkOnly) {
    console.error(`✗ ${path.relative(root, file)} out of sync`);
    errors += 1;
  } else {
    fs.writeFileSync(file, after);
    console.log(`✓ ${path.relative(root, file)}`);
    changed += 1;
  }
}

if (checkOnly) {
  if (errors) {
    console.error(`sync:chrome --check failed (${errors})`);
    process.exit(1);
  }
  console.log(`sync:chrome --check OK (${files.length} pages)`);
} else {
  if (errors) process.exit(1);
  console.log(`Synced chrome into ${changed}/${files.length} pages`);
}
