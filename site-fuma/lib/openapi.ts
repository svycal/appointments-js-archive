import { createOpenAPI } from "fumadocs-openapi/server";

export const openapi = createOpenAPI({
  input: ["https://api.savvycal.app/v1/spec"],
  proxyUrl: "/proxy",
});
