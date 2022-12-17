import { randomUUID } from "crypto";
import { Prisma } from "@prisma/client";
import { addTags } from "src/service/entries/addTags";
import { updateEntryToLatestHistory } from "src/service/entries/updateEntryToLatestHistory";
import { prisma } from "src/service/prisma/client";

interface Props {
  pid: string;
  pageTitle?: string;
  source: string;
  message?: string;
  revision?: string;
  createdAt?: Date;
  tags?: string[];
}

const HistoryValidator =
  Prisma.validator<Prisma.HistoryCreateWithoutEntryInput>();
const EntryInputValidator = Prisma.validator<Prisma.EntryCreateInput>();
const EntryUpdateValidator = Prisma.validator<Prisma.EntryUpdateInput>();

export const addEntry = async (props: Props) => {
  const now = new Date();
  const { pid, pageTitle, source, revision, createdAt, tags, message } = {
    ...props,
    createdAt: props.createdAt ?? now,
    revision: props.revision ?? randomUUID(),
  };

  const history = HistoryValidator({
    source,
    revision,
    createdAt,
    message,
  });

  const createEntry = EntryInputValidator({
    pid,
    pageTitle,
    createdAt,
    tags: { create: [] },
    history: {
      create: history,
    },
  });
  const updateEntryHistory = EntryUpdateValidator({
    history: {
      connectOrCreate: {
        where: {
          entryRevision: {
            entryPid: pid,
            revision,
          },
        },
        create: history,
      },
    },
  });

  await prisma.entry.upsert({
    where: {
      pid,
    },
    create: createEntry,
    update: updateEntryHistory,
  });

  await updateEntryToLatestHistory(pid);

  if (tags) {
    await addTags({ pid, tags });
  }
};
