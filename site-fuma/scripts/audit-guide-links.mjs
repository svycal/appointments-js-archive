import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = path.join(root, "content/docs");
const llmsUrl = process.env.LLMS_URL ?? "http://localhost:3000/llms.txt";

function isGuideFile(rel) {
  return !rel.startsWith(`api${path.sep}`) && !rel.startsWith("api/");
}

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (/\.(md|mdx)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function extractLinks(markdown) {
  const links = [];
  const patterns = [
    /\]\((\/docs\/[^)\s]+)\)/g,
    /href=["'](\/docs\/[^"']+)["']/g,
  ];
  for (const pattern of patterns) {
    for (const match of markdown.matchAll(pattern)) {
      links.push(match[1]);
    }
  }
  return links;
}

function splitHash(href) {
  const [pathname, hash] = href.split("#");
  return { pathname: pathname.replace(/\/$/, "") || "/", hash: hash ?? "" };
}

function kebabToCamel(kebab) {
  return kebab.replace(/-([a-z0-9])/g, (_, ch) => ch.toUpperCase());
}

const files = (await walk(contentRoot)).filter((file) =>
  isGuideFile(path.relative(contentRoot, file)),
);

const occurrences = [];
for (const file of files) {
  const rel = path.relative(contentRoot, file);
  const markdown = await fs.readFile(file, "utf8");
  for (const href of extractLinks(markdown)) {
    occurrences.push({ file: rel, href, ...splitHash(href) });
  }
}

const llms = await fetch(llmsUrl).then((res) => {
  if (!res.ok) throw new Error(`Failed to fetch ${llmsUrl}: ${res.status}`);
  return res.text();
});

const validPaths = new Set();
for (const match of llms.matchAll(/\((\/docs[^)\s#]*)\)/g)) {
  validPaths.add(match[1].replace(/\/$/, "") || "/docs");
}
validPaths.add("/docs");
validPaths.add("/docs/api");

const byLastSegment = new Map();
for (const url of validPaths) {
  const last = url.split("/").filter(Boolean).at(-1);
  if (!last) continue;
  const list = byLastSegment.get(last) ?? [];
  list.push(url);
  byLastSegment.set(last, list);
}

const uniqueHrefs = [...new Set(occurrences.map((item) => item.pathname))].sort();
const broken = [];
const suggestions = new Map();

for (const pathname of uniqueHrefs) {
  if (validPaths.has(pathname)) continue;

  const last = pathname.split("/").filter(Boolean).at(-1) ?? "";
  const camel = kebabToCamel(last);
  const candidates = [
    ...(byLastSegment.get(camel) ?? []),
    ...(byLastSegment.get(last) ?? []),
  ].filter((url, index, arr) => arr.indexOf(url) === index);

  broken.push(pathname);
  if (candidates.length === 1) suggestions.set(pathname, candidates[0]);
  else if (candidates.length > 1) suggestions.set(pathname, candidates);
}

const filesByPath = new Map();
for (const item of occurrences) {
  if (!broken.includes(item.pathname)) continue;
  const list = filesByPath.get(item.pathname) ?? new Set();
  list.add(item.file);
  filesByPath.set(item.pathname, list);
}

console.log(`Guide files: ${files.length}`);
console.log(`Internal /docs links: ${occurrences.length} (${uniqueHrefs.length} unique paths)`);
console.log(`Valid routes from llms.txt: ${validPaths.size}`);
console.log(`Broken unique paths: ${broken.length}`);
console.log("");

for (const pathname of broken) {
  const suggestion = suggestions.get(pathname);
  const filesForPath = [...(filesByPath.get(pathname) ?? [])].join(", ");
  const hint = Array.isArray(suggestion)
    ? `candidates: ${suggestion.join(" | ")}`
    : suggestion
      ? `-> ${suggestion}`
      : "no candidate";
  console.log(`${pathname}\n  in ${filesForPath}\n  ${hint}\n`);
}

const report = {
  broken,
  suggestions: Object.fromEntries(suggestions),
  filesByPath: Object.fromEntries(
    [...filesByPath].map(([key, value]) => [key, [...value]]),
  ),
};

await fs.writeFile(
  path.join(root, "scripts/audit-guide-links.report.json"),
  JSON.stringify(report, null, 2),
);
