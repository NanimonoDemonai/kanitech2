import { randomUUID } from "crypto";
import { Prisma } from "@prisma/client";
import { addTags } from "src/service/entries/addTags";
import { prisma } from "src/service/prisma/client";

interface Props {
  pid: string;
  pageTitle?: string;
  source: string;
  revision?: string;
  createdAt?: Date;
  tags?: string[];
}

const HistoryValidator =
  Prisma.validator<Prisma.HistoryCreateWithoutEntryInput>();
const TagsValidator =
  Prisma.validator<Prisma.TagCreateOrConnectWithoutEntriesInput>();
const EntryInputValidator = Prisma.validator<Prisma.EntryCreateInput>();
const EntryUpdateValidator = Prisma.validator<Prisma.EntryUpdateInput>();

export const addEntry = async (props: Props) => {
  const now = new Date();
  const entryData = {
    ...props,
    createdAt: props.createdAt ?? now,
    revision: props.revision ?? randomUUID(),
  };

  const history = HistoryValidator({
    source: entryData.source,
    revision: entryData.revision,
    createdAt: entryData.createdAt,
  });

  const createEntry = EntryInputValidator({
    ...entryData,
    history: {
      create: history,
    },
    tags: undefined,
  });
  const updateEntryHistory = EntryUpdateValidator({
    history: {
      connectOrCreate: {
        where: { revision: entryData.revision },
        create: history,
      },
    },
  });
  const updateEntry = EntryUpdateValidator({
    pageTitle: entryData.pageTitle,
    source: entryData.source,
    createdAt: entryData.createdAt,
    tags: undefined,
  });

  await prisma.$transaction([
    prisma.entry.upsert({
      where: {
        pid: entryData.pid,
      },
      create: createEntry,
      update: updateEntryHistory,
    }),
    // updateManyとしているが一つしか更新しない
    prisma.entry.updateMany({
      where: {
        pid: entryData.pid,
        createdAt: {
          lt: now,
        },
      },
      data: updateEntry,
    }),
  ]);
  const tags = props.tags;
  if (tags) {
    await addTags({ pid: props.pid, tags });
  }
};
