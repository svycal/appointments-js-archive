"use client";

import Script from "next/script";

export function EmbedScript({ src }: { src: string }) {
  return <Script src={src} strategy="afterInteractive" />;
}
