"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

function resetScroll() {
  const hash = window.location.hash.slice(1);
  if (hash) {
    const target = document.getElementById(decodeURIComponent(hash));
    target?.scrollIntoView();
    return;
  }

  document.getElementById("nd-notebook-layout")?.scrollTo(0, 0);
  window.scrollTo(0, 0);
}

export function ResetScrollOnNavigate() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    resetScroll();
  }, [pathname]);

  return null;
}
