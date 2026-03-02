import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

import {
  SidebarItem,
  SidebarItemLink,
} from "@docusaurus/plugin-content-docs/src/sidebars/types.js";

import apisidebar from "./docs/api/sidebar";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docSidebar: [
    "index",
    "authentication",
    {
      collapsed: false,
      items: [
        "data-model",
        "users-and-accounts",
        "connected-accounts",
        "booking-intents",
        "slot-availability",
        "dates",
        "metadata-filtering",
      ],
      label: "Concepts",
      type: "category",
    },
    {
      collapsed: false,
      items: ["components/public-booking-form"],
      label: "Components",
      link: {
        id: "components/index",
        type: "doc",
      },
      type: "category",
    },
    {
      collapsed: false,
      items: ["embedding/booking-embed"],
      label: "Embedding",
      type: "category",
    },
    "webhooks",
    "changelog",
  ],
  openApiSidebar: [
    {
      items: sortSidebarItems(
        apisidebar.filter(
          (item: { id: string } & SidebarItem) =>
            item.id !== "api/savvycal-appointments-api",
        ),
      ),
      label: "REST API",
      link: {
        description:
          "The API Reference provides a detailed overview of the SavvyCal API.",
        slug: "/category/rest-api",
        title: "REST API",
        type: "generated-index",
      },
      type: "category",
    },
  ],
};

/**
 * Sorts the sidebar items alphabetically:
 * - Top-level categories are sorted by label
 * - Items within the "Schemas" category are sorted by label
 */
function sortSidebarItems(items: SidebarItem[]) {
  return items
    .map((item) => {
      if (item.type === "category" && item.label === "Schemas") {
        return {
          ...item,
          items: (item.items as SidebarItemLink[]).sort((a, b) =>
            a.label.localeCompare(b.label),
          ),
        };
      }
      return item;
    })
    .sort((a, b) => {
      const labelA = a.type === "category" ? a.label : "";
      const labelB = b.type === "category" ? b.label : "";
      return labelA.localeCompare(labelB);
    });
}

export default sidebars;
