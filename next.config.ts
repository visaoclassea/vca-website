import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "consulta.visaoclassea.com.br",
          },
        ],
        destination: "/consulta-classe-a",
      },
    ];
  },
};

export default nextConfig;
