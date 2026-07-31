import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "consulta.visaoclassea.com.br",
          },
        ],
        destination:
          "https://consulta.visaoclassea.com.br/consulta-classe-a",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
