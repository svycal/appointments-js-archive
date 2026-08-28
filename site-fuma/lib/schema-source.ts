import type { PageData } from "fumadocs-core/source";
import type { StaticSource } from "fumadocs-core/source";

import { openapi } from "./openapi";

export interface SchemaPageData extends PageData {
  schemaJson: string;
  schemaName: string;
  getSchemaPageProps: () => {
    document: string;
    payload: {
      bundled: unknown;
      proxyUrl?: string;
    };
    schemaName: string;
  };
}

function schemaDescription(schema: unknown): string | undefined {
  if (!schema || typeof schema !== "object") return undefined;
  if (!("description" in schema)) return undefined;
  return typeof schema.description === "string"
    ? schema.description
    : undefined;
}

function schemaToJson(schema: unknown): string {
  try {
    return JSON.stringify(schema, null, 2) ?? "";
  } catch {
    return "";
  }
}

export async function createSchemaSource(): Promise<
  StaticSource<{
    pageData: SchemaPageData;
    metaData: { title?: string; pages?: string[]; defaultOpen?: boolean };
  }>
> {
  const documents = await openapi.getSchemas();
  const files: StaticSource<{
    pageData: SchemaPageData;
    metaData: { title?: string; pages?: string[]; defaultOpen?: boolean };
  }>["files"] = [];

  for (const [document, loaded] of Object.entries(documents)) {
    const schemas = loaded.bundled.components?.schemas ?? {};
    const names = Object.keys(schemas).sort((a, b) => a.localeCompare(b));
    const slugs = names.map((name) => name.toLowerCase());
    const collisions = new Set(
      slugs.filter((slug, index) => slugs.indexOf(slug) !== index),
    );

    files.push({
      data: {
        defaultOpen: false,
        pages: names.map((name) =>
          collisions.has(name.toLowerCase()) ? name : name.toLowerCase(),
        ),
        title: "Schemas",
      },
      path: "api/schemas/meta.json",
      type: "meta",
    });

    for (const name of names) {
      const schema = schemas[name];
      const slug = collisions.has(name.toLowerCase())
        ? name
        : name.toLowerCase();
      const description = schemaDescription(schema);
      const schemaJson = schemaToJson(schema);
      const contents = [
        ...(description
          ? [{ content: description, heading: undefined }]
          : []),
        ...(schemaJson ? [{ content: schemaJson, heading: undefined }] : []),
      ];

      files.push({
        data: {
          description,
          getSchemaPageProps() {
            return {
              document,
              payload: {
                bundled: loaded.bundled,
                proxyUrl: openapi.options.proxyUrl,
              },
              schemaName: name,
            };
          },
          schemaJson,
          schemaName: name,
          structuredData: {
            contents,
            headings: [{ content: name, id: "schema" }],
          },
          title: name,
        },
        path: `api/schemas/${slug}.mdx`,
        type: "page",
      });
    }
  }

  return { files };
}
