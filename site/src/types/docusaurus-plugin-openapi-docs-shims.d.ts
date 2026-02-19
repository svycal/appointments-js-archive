/**
 * Type shims for modules referenced by docusaurus-plugin-openapi-docs that
 * don't exist in newer versions of @docusaurus/plugin-content-docs.
 */

declare module "@docusaurus/plugin-content-docs/src/sidebars/types" {
  export type SidebarItemBase = {
    key?: string;
    className?: string;
    customProps?: { [key: string]: unknown };
  };

  export type SidebarItemDoc = SidebarItemBase & {
    type: "doc" | "ref";
    label?: string;
    id: string;
    translatable?: true;
  };
}

declare module "@docusaurus/plugin-content-docs-types" {
  export type {
    PropSidebarItemCategory,
    PropSidebarItem as SidebarItemLink,
    PropSidebar,
    PropSidebarItem,
  } from "@docusaurus/plugin-content-docs";
}
