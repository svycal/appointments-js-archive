import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        destination: "/",
        permanent: false,
        source: "/docs",
      },
      {
        destination: "/:path*",
        permanent: false,
        source: "/docs/:path*",
      },
    ];
  },
};

export default withMDX(config);
