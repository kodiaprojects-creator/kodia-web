#!/usr/bin/env node
/**
 * Validate internal hrefs in all index.html files.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'docs', 'partials', '.git'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

function existsRoute(href) {
  if (href === '/') return fs.existsSync(path.join(root, 'index.html'));
  const clean = href.replace(/\/$/, '');
  const asDir = path.join(root, clean.slice(1), 'index.html');
  const asFile = path.join(root, clean.slice(1));
  return fs.existsSync(asDir) || fs.existsSync(asFile);
}

const homeHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const homeIds = new Set(
  [...homeHtml.matchAll(/\bid=["']([^"']+)["']/g)].map((m) => m[1])
);

let errors = 0;
const files = walk(root);

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file);
  const hrefs = [...html.matchAll(/\bhref=["']([^"']+)["']/g)].map((m) => m[1]);

  for (const href of hrefs) {
    if (
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('//') ||
      href.startsWith('data:') ||
      href === '#'
    ) {
      if (href === '#') {
        console.error(`✗ ${rel}: href="#"`);
        errors += 1;
      }
      continue;
    }

    // Pure in-page hash on current page — skip deep validation except home anchors via /#
    if (href.startsWith('#') && !href.startsWith('/#')) continue;

    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (!homeIds.has(id)) {
        console.error(`✗ ${rel}: missing home anchor ${href}`);
        errors += 1;
      }
      continue;
    }

    if (!href.startsWith('/')) continue; // relative — rare; skip or resolve later

    const pathOnly = href.split('#')[0];
    if (!pathOnly.endsWith('/') && !pathOnly.includes('.')) {
      console.error(`✗ ${rel}: missing trailing slash ${href}`);
      errors += 1;
      continue;
    }

    if (!existsRoute(pathOnly)) {
      console.error(`✗ ${rel}: broken ${href}`);
      errors += 1;
    }
  }
}

if (errors) {
  console.error(`check:links failed with ${errors} error(s)`);
  process.exit(1);
}
console.log(`check:links OK (${files.length} pages)`);
