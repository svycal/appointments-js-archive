import { llms } from "fumadocs-core/source";

import { source } from "@/lib/source";

export const revalidate = false;

function oneLineDescription(markdown: string | undefined): string {
  if (!markdown) return "";

  const firstParagraph = markdown.trim().split(/\n\s*\n/)[0] ?? "";
  const collapsed = firstParagraph.replace(/\s+/g, " ").trim();
  const match = collapsed.match(/^(.+?[.!?])(?:\s|$)/);
  const sentence = match?.[1] ?? collapsed;

  return sentence.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
}

function dataDescription(data: unknown): string | undefined {
  if (!data || typeof data !== "object" || !("description" in data)) {
    return undefined;
  }

  return typeof data.description === "string" ? data.description : undefined;
}

export function GET() {
  const index = llms(source, {
    renderDescription(item, ctx) {
      if (item.type === "page") {
        const page = source.getNodePage(item, ctx.lang);
        return oneLineDescription(dataDescription(page?.data));
      }

      const meta = source.getNodeMeta(item, ctx.lang);
      return oneLineDescription(
        dataDescription(meta?.data) ??
          (typeof item.description === "string" ? item.description : undefined),
      );
    },
  }).index();
  const extras = `

## Optional

- [API Specification](https://api.savvycal.app/v1/spec): Complete OpenAPI spec for the SavvyCal Appointments REST API
`;

  return new Response(index + extras);
}
