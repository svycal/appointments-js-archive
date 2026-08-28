import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { NextRequest, NextResponse } from "next/server";

import { docsContentRoute, docsRoute } from "@/lib/shared";

const docsPath = docsRoute === "/" ? "" : docsRoute;
const { rewrite: rewriteDocs } = rewritePath(
  `${docsPath}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsPath}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

function isReserved(pathname: string) {
  return (
    pathname.startsWith("/search") ||
    pathname.startsWith("/proxy") ||
    pathname.startsWith("/llms") ||
    pathname.startsWith("/og/")
  );
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isReserved(pathname)) {
    return NextResponse.next();
  }

  const suffix = rewriteSuffix(pathname);
  if (suffix) {
    return NextResponse.rewrite(new URL(suffix, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const rewritten = rewriteDocs(pathname);

    if (rewritten) {
      return NextResponse.rewrite(new URL(rewritten, request.nextUrl), {
        headers: { Vary: "Accept" },
      });
    }
  }

  return NextResponse.next();
}
