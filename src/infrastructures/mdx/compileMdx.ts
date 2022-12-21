import { bundleMDX } from "mdx-bundler";

export const compileMdx = async (
  source: string
): Promise<ReturnType<typeof bundleMDX>> => await bundleMDX({ source });
