"use client";

import { useEffect, useState } from "react";

const COMPONENTS_BASE_URL = "https://appointments-react-components.vercel.app";

export function ComponentDemo({ route }: { route: string }) {
  const [height, setHeight] = useState(400);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== COMPONENTS_BASE_URL) return;
      if (
        event.data?.event === "resized" &&
        typeof event.data.height === "number"
      ) {
        setHeight(event.data.height);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="my-6 overflow-hidden rounded-xl border bg-white dark:border-transparent">
      <iframe
        src={`${COMPONENTS_BASE_URL}/${route}`}
        style={{ border: "none", height, width: "100%" }}
        title={`${route} demo`}
      />
    </div>
  );
}
