import { z } from "zod";
import {FrontMatter} from "../../types/FrontMatter";

const DEFAULT_VALUE: FrontMatter = {
  title: "",
  tags: [],
};

const schema = z.object({
  title: z.string().default(DEFAULT_VALUE.title),
  tags: z.array(z.string()).default(DEFAULT_VALUE.tags),
}).strict();

export const unknownObjectToFrontMatter = (unknownObject: unknown): FrontMatter => {
  const result = schema.safeParse(unknownObject);
  return result.success ? result.data : DEFAULT_VALUE;
};
