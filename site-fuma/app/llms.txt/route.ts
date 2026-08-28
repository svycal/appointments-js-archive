import { llms } from "fumadocs-core/source";

import { source } from "@/lib/source";

export const revalidate = false;

export function GET() {
  const index = llms(source).index();
  const extras = `

## Optional

- [API Specification](https://api.savvycal.app/v1/spec): Complete OpenAPI spec for the SavvyCal Appointments REST API
`;

  return new Response(index + extras);
}
