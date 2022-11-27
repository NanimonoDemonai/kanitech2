import parser from "gray-matter";
import { FrontMatter } from "src/types/FrontMatter";
import { unknownObjectToFrontMatter } from "src/utils/validators/unknownObjectToFrontMatter";

interface Res {
  frontMatter: FrontMatter;
  content: string;
}

export const frontMatterParser = (source: string): Res => {
  const { data, content } = parser(source);
  const frontMatter = unknownObjectToFrontMatter(data);
  return { frontMatter, content: content.trim() };
};
