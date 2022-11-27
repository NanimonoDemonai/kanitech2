import path from "path";
import fg from "fast-glob";

export const getEntries = async (
  rootPath: string
): Promise<{ name: string; path: string }[]> =>
  (await fg([`${rootPath}/**.mdx`], { objectMode: true })).map((e) => ({
    name: path.parse(e.name).name,
    path: e.path,
  }));
