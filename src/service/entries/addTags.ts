import { Prisma } from "@prisma/client";
import { prisma } from "src/service/prisma/client";

interface Props {
  pid: string;
  tags: string[];
}

const EntryUpdateValidator = Prisma.validator<Prisma.EntryUpdateInput>();
export const addTags = async ({ pid, tags }: Props) => {
  const updateEntry = EntryUpdateValidator({
    tags: {
      connectOrCreate: tags.map((tagName) => ({
        where: { tagName },
        create: { tagName },
      })),
    },
  });
  await prisma.entry.update({
    where: { pid },
    data: updateEntry,
  });
};
