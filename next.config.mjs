import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: { esmExternals: true },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            /** @type {import('@mdx-js/loader').Options} */
            remarkPlugins: [
              remarkFrontmatter,
              [remarkMdxFrontmatter, { name: "frontmatter" }],
            ],
          },
        },
      ],
    });
    return config;
  },
};
export default nextConfig;
