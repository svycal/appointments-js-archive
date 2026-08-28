"use client";

import { createContext, useContext, type ComponentType } from "react";
import { createOpenAPIPage } from "fumadocs-openapi/ui";

const SchemaNameContext = createContext("");

function SchemaFields({
  ctx,
}: {
  ctx: {
    SchemaUI: ComponentType<{
      client: { as: "body"; name: string };
      root: unknown;
      showExample?: boolean;
    }>;
    schema: {
      dereferenced: {
        components?: { schemas?: Record<string, unknown> };
      };
    };
  };
}) {
  const schemaName = useContext(SchemaNameContext);
  const SchemaUI = ctx.SchemaUI;
  const schemas = ctx.schema.dereferenced.components?.schemas ?? {};
  const key =
    schemaName in schemas
      ? schemaName
      : (Object.keys(schemas).find(
          (name) => name.toLowerCase() === schemaName.toLowerCase(),
        ) ?? schemaName);
  const schema = schemas[key];

  if (!schema) {
    return <p>Schema {schemaName} was not found in the OpenAPI document.</p>;
  }

  return (
    <div className="text-sm">
      <SchemaUI client={{ as: "body", name: key }} root={schema} showExample />
    </div>
  );
}

const SchemaOpenAPIPage = createOpenAPIPage({
  content: {
    renderPageLayout(_slots, ctx) {
      return <SchemaFields ctx={ctx} />;
    },
  },
  playground: { enabled: false },
});

export function SchemaPage({
  document,
  payload,
  schemaName,
}: {
  document: string;
  payload: {
    bundled: unknown;
    proxyUrl?: string;
  };
  schemaName: string;
}) {
  return (
    <SchemaNameContext.Provider value={schemaName}>
      <SchemaOpenAPIPage
        document={document}
        operations={[]}
        payload={payload as never}
      />
    </SchemaNameContext.Provider>
  );
}
