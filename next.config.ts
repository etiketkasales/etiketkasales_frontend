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
    includePaths: [path.join(__dirname, "src")],
    prependData: `
      @use "app/styles/colors.scss" as *;
      @use "app/styles/sizes.scss" as *;
      @use "app/styles/text.scss" as *;
    `,
  },

  output: "standalone",
};

export default nextConfig;
