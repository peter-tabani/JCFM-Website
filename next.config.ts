import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/donors/portal/:path*", destination: "/donate", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path((?:admin|api|donors/portal|login|journey)(?:/.*)?)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
