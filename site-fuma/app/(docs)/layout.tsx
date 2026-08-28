import { DocsLayout } from "fumadocs-ui/layouts/notebook";

import { ResetScrollOnNavigate } from "@/components/reset-scroll-on-navigate";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
      <ResetScrollOnNavigate />
      {children}
    </DocsLayout>
  );
}
