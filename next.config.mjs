import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import {withSuperjson} from 'next-superjson';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    experimental: {esmExternals: true},
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
                            [remarkMdxFrontmatter, {name: "frontmatter"}],
                        ],
                    },
                },
            ],
        });
        config.module.rules = config.module.rules.map((e) => ({...e, resourceQuery: {not: [/raw/]}}));
        config.module.rules.push({
            resourceQuery: /raw/,
            type: "asset/source",
        });
        return config;
    },
};
export default withSuperjson()(nextConfig);
