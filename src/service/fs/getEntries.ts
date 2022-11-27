import fg from "fast-glob";

export const getEntries = async (path: string): Promise<string[]> =>
  await fg([`${path}/**.mdx`]);
