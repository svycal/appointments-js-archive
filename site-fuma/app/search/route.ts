import type { StructuredData } from "fumadocs-core/mdx-plugins";
import { createFromSource } from "fumadocs-core/search/server";

import { source } from "@/lib/source";

export const { GET } = createFromSource(source, {
  async buildIndex(page) {
    let structuredData: StructuredData | undefined;

    if (page.data.structuredData) {
      structuredData =
        typeof page.data.structuredData === "function"
          ? await page.data.structuredData()
          : page.data.structuredData;
    } else if ("load" in page.data && typeof page.data.load === "function") {
      structuredData = (await page.data.load()).structuredData;
    }

    if (!structuredData) {
      structuredData = {
        contents: page.data.description
          ? [{ content: page.data.description, heading: undefined }]
          : [],
        headings: [],
      };
    }

    return {
      description: page.data.description,
      id: page.url,
      structuredData,
      title: page.data.title ?? page.path,
      url: page.url,
    };
  },
});
