import { readFile } from "node:fs/promises";
import path from "node:path";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

const sourcesRoot = path.join(process.cwd(), "../components/react");

export async function ComponentSource({ name }: { name: string }) {
  const [ts, js] = await Promise.all([
    readFile(path.join(sourcesRoot, "src/components", `${name}.tsx`), "utf8"),
    readFile(path.join(sourcesRoot, "js", `${name}.jsx`), "utf8"),
  ]);

  return (
    <Tabs groupId="language" items={["TypeScript", "JavaScript"]}>
      <Tab value="TypeScript">
        <p>
          Create a new file called <code>{name}.tsx</code> in your app&apos;s
          components directory:
        </p>
        <DynamicCodeBlock code={ts} lang="tsx" />
      </Tab>
      <Tab value="JavaScript">
        <p>
          Create a new file called <code>{name}.jsx</code> in your app&apos;s
          components directory:
        </p>
        <DynamicCodeBlock code={js} lang="jsx" />
      </Tab>
    </Tabs>
  );
}
