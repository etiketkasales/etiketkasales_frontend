import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  sassOptions: {
    loadPaths: [path.join(__dirname, "src")],
    additionalData: `
      @use "app/styles/colors.scss" as *;
      @use "app/styles/sizes.scss" as *;
      @use "app/styles/text.scss" as *;
    `,
  },

  images: {
    loader: "default",
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.etiketkasales.ru",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "etiketkasales.ru",
        port: "",
        pathname: "/**",
      }
    ],
  },

  output: "standalone",
};

export default nextConfig;
