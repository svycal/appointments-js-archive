import type { Folder, Node } from "fumadocs-core/page-tree";
import { Card, Cards } from "fumadocs-ui/components/card";
import type { ReactNode } from "react";

import { openapi } from "@/lib/openapi";
import { source } from "@/lib/source";

function asText(value: ReactNode): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  return "";
}

function firstSentence(text: string): string | undefined {
  const trimmed = text.trim().replace(/\s+/g, " ");
  if (!trimmed) return undefined;

  const match = trimmed.match(/^[^.!?]+[.!?]/);
  return (match?.[0] ?? trimmed).trim();
}

function firstPageUrl(node: Node): string | undefined {
  if (node.type === "page") return node.url;
  if (node.type !== "folder") return undefined;

  if (node.index) return node.index.url;

  for (const child of node.children) {
    const url = firstPageUrl(child);
    if (url) return url;
  }
}

function findApiFolder(nodes: Node[]): Folder | undefined {
  for (const node of nodes) {
    if (node.type !== "folder") continue;
    if (asText(node.name) === "API Reference" || node.$ref?.folder === "api") {
      return node;
    }

    const nested = findApiFolder(node.children);
    if (nested) return nested;
  }
}

async function tagDescriptions(): Promise<Map<string, string>> {
  const descriptions = new Map<string, string>();
  const documents = await openapi.getSchemas();

  for (const loaded of Object.values(documents)) {
    const tags = loaded.bundled.tags;
    if (!Array.isArray(tags)) continue;

    for (const tag of tags) {
      if (!tag || typeof tag !== "object") continue;

      const name = "name" in tag && typeof tag.name === "string" ? tag.name : "";
      const description =
        "description" in tag && typeof tag.description === "string"
          ? tag.description
          : "";
      const summary = firstSentence(description);
      if (name && summary) descriptions.set(name.toLowerCase(), summary);
    }
  }

  return descriptions;
}

export async function ApiReferenceIndex() {
  const api = findApiFolder(source.getPageTree().children);
  const descriptions = await tagDescriptions();
  const groups = (api?.children ?? []).flatMap((node) => {
    if (node.type !== "folder") return [];

    const href = firstPageUrl(node);
    if (!href) return [];

    const title = asText(node.name) || "Untitled";
    const description =
      descriptions.get(title.toLowerCase()) ??
      (title === "Schemas" ? "Request and response payload types." : undefined);

    return [{ description, href, title }];
  });

  return (
    <Cards>
      {groups.map((group) => (
        <Card
          description={group.description}
          href={group.href}
          key={group.href}
          title={group.title}
        />
      ))}
    </Cards>
  );
}
