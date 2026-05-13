/**
 * Type shims for modules referenced by docusaurus-plugin-openapi-docs that
 * don't exist in newer versions of @docusaurus/plugin-content-docs.
 */

declare module "@docusaurus/plugin-content-docs/src/sidebars/types" {
  export type SidebarItemBase = {
    className?: string;
    customProps?: { [key: string]: unknown };
    key?: string;
  };

  export type SidebarItemDoc = {
    id: string;
    label?: string;
    translatable?: true;
    type: "doc" | "ref";
  } & SidebarItemBase;
}

declare module "@docusaurus/plugin-content-docs-types" {
  export type {
    PropSidebar,
    PropSidebarItem,
    PropSidebarItemCategory,
    PropSidebarItem as SidebarItemLink,
  } from "@docusaurus/plugin-content-docs";
}
