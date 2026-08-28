import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        active: "url",
        text: "Guides",
        url: "/",
      },
      {
        active: "nested-url",
        text: "API Reference",
        url: "/api",
      },
    ],
    nav: {
      url: "/",
      title: (
        <>
          <img
            alt="SavvyCal"
            className="size-6 rounded-md"
            height={24}
            src="/img/logo.svg"
            width={24}
          />
          {appName}
        </>
      ),
    },
  };
}
