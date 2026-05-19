import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["antd", "@ant-design/icons", "@refinedev/antd"],
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

  // Удалённые картинки идут через ImageWrapper с unoptimized (см. image-wrapper).
  images: {
    loader: "default",
  },

  output: "standalone",
};

export default nextConfig;
