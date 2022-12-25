import parser from "gray-matter";
import { z } from "zod";

export interface FrontMatter {
  title: string;
  tags: string[];
}

interface Res {
  frontMatter: FrontMatter;
  content: string;
}

const DEFAULT_VALUE: FrontMatter = {
  title: "",
  tags: [],
};

const schema = z
  .object({
    title: z.string().default(DEFAULT_VALUE.title),
    tags: z.array(z.string()).default(DEFAULT_VALUE.tags),
  })
  .strict();

export const unknownObjectToFrontMatter = (
  unknownObject: unknown
): FrontMatter => {
  const result = schema.safeParse(unknownObject);
  return result.success ? result.data : DEFAULT_VALUE;
};

export const frontMatterParser = (source: string): Res => {
  const { data, content } = parser(source);
  const frontMatter = unknownObjectToFrontMatter(data);
  return { frontMatter, content: content.trim() };
};
