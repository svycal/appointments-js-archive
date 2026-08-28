import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcRoot = path.resolve(root, "../site/docs");
const destRoot = path.join(root, "content/docs");

const concepts = [
  "platforms",
  "data-model",
  "users-and-accounts",
  "connected-accounts",
  "booking-intents",
  "slot-availability",
  "dates",
  "metadata-filtering",
];

const skip = new Set(["api"]);

function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) {
    return { attrs: {}, body: raw };
  }

  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return { attrs: {}, body: raw };
  }

  const fm = raw.slice(4, end).trim();
  const body = raw.slice(end + 4).replace(/^\n/, "");
  const attrs = {};

  for (const line of fm.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key) attrs[key] = value;
  }

  return { attrs, body };
}

function stringifyFrontmatter(attrs, body) {
  const lines = Object.entries(attrs)
    .filter(([, value]) => value != null && value !== "")
    .map(([key, value]) => {
      const needsQuotes =
        /[:#{}[\],&*?|<>=!%@`]/.test(value) || value.includes("\n");
      return needsQuotes
        ? `${key}: ${JSON.stringify(value)}`
        : `${key}: ${value}`;
    });

  return `---\n${lines.join("\n")}\n---\n\n${body.replace(/^\n+/, "")}`;
}

function convertAdmonitions(body) {
  return body.replace(/:::(\w+)\n([\s\S]*?):::/g, (_match, type, content) => {
    const calloutType =
      type === "warning" || type === "caution" ? "warn" : undefined;
    const attr = calloutType ? ` type="${calloutType}"` : "";
    return `<Callout${attr}>\n${content.trim()}\n</Callout>`;
  });
}

function rewriteLinks(body) {
  return body.replace(/\]\((\/[^)]+)\)/g, (match, href) => {
    if (
      href.startsWith("/docs") ||
      href.startsWith("/img") ||
      href.startsWith("/llms") ||
      href.startsWith("//")
    ) {
      return match;
    }

    if (
      href === "/category/rest-api" ||
      href.startsWith("/category/rest-api")
    ) {
      return "](/docs/api)";
    }

    return `](/docs${href})`;
  });
}

function convertBody(body) {
  let next = body;
  next = next.replace(/<head>[\s\S]*?<\/head>\s*/g, "");
  next = convertAdmonitions(next);
  next = rewriteLinks(next);
  return next;
}

function extractTitle(body) {
  const match = body.match(/^#\s+(.+)\n*/);
  if (!match) return { title: null, body };
  return { title: match[1].trim(), body: body.slice(match[0].length) };
}

async function convertFile(src, dest) {
  const raw = await fs.readFile(src, "utf8");
  const parsed = parseFrontmatter(raw);
  const converted = convertBody(parsed.body);
  const { title: heading, body } = extractTitle(converted);

  const attrs = { ...parsed.attrs };
  delete attrs.id;
  delete attrs.sidebar_label;
  if (!attrs.title && heading) attrs.title = heading;

  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, stringifyFrontmatter(attrs, body));
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (skip.has(entry.name)) continue;
    const src = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(src);
      continue;
    }
    if (!/\.(md|mdx)$/.test(entry.name)) continue;

    const rel = path.relative(srcRoot, src);
    const parsed = path.parse(rel);
    const slug = parsed.name;
    let destRel = path.join(parsed.dir, `${slug}.mdx`);

    if (concepts.includes(slug) && parsed.dir === "") {
      destRel = path.join("(concepts)", `${slug}.mdx`);
    }

    await convertFile(src, path.join(destRoot, destRel));
  }
}

await fs.rm(destRoot, { recursive: true, force: true });
await walk(srcRoot);
console.log("Ported docs into", destRoot);
