import { loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { defineDocs } from "fumadocs-mdx/macro";

import { openapi } from "./openapi";
import { createSchemaSource } from "./schema-source";
import { docsContentRoute, docsImageRoute, docsRoute } from "./shared";

const docs = defineDocs({
  dir: "content/docs",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
    schema: pageSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export const source = loader(
  {
    docs: docs.toFumadocsSource(),
    openapi: await openapi.staticSource({
      baseDir: "api",
      groupBy: "tag",
    }),
    schemas: await createSchemaSource(),
  },
  {
    baseUrl: docsRoute,
    plugins: [
      lucideIconsPlugin(),
      openapi.loaderPlugin(),
      {
        transformPageTree: {
          file(node, filePath) {
            if (filePath === "index.mdx" || node.url === "/") {
              return { ...node, name: "Home" };
            }

            return node;
          },
        },
      },
    ],
  },
);

export function getPageImageUrl(page: (typeof source)["$inferPage"]) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url:
      "/" +
      [page.locale, ...docsImageRoute.split("/"), ...segments]
        .filter(Boolean)
        .join("/"),
  };
}

export function getPageMarkdownUrl(page: (typeof source)["$inferPage"]) {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url:
      "/" +
      [page.locale, ...docsContentRoute.split("/"), ...segments]
        .filter(Boolean)
        .join("/"),
  };
}

export async function getLLMText(page: (typeof source)["$inferPage"]) {
  if (page.type === "openapi") {
    const description = page.data.description
      ? `\n\n${page.data.description}`
      : "";

    return `# ${page.data.title} (${page.url})${description}`;
  }

  if (page.type === "schemas") {
    const description = page.data.description
      ? `\n\n${page.data.description}`
      : "";
    const json = page.data.schemaJson
      ? `\n\n\`\`\`json\n${page.data.schemaJson}\n\`\`\``
      : "";

    return `# ${page.data.title} (${page.url})${description}${json}`;
  }

  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}
