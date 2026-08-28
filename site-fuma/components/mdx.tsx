import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { ApiReferenceIndex } from "@/components/api-reference-index";
import { ComponentDemo } from "@/components/component-demo";
import { ComponentSource } from "@/components/component-source";
import { EmbedScript } from "@/components/embed-script";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ApiReferenceIndex,
    ComponentDemo,
    ComponentSource,
    EmbedScript,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
