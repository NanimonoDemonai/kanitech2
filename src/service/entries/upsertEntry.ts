import { Prisma } from "@prisma/client";
import { prisma } from "src/service/prisma/client";

const HistoryValidator =
  Prisma.validator<Prisma.HistoryCreateWithoutEntryInput>();
const EntryInputValidator = Prisma.validator<Prisma.EntryCreateInput>();
const EntryUpdateValidator = Prisma.validator<Prisma.EntryUpdateInput>();

interface Props {
  source: string;
  revision: string;
  createdAt: Date;
  message?: string;
  pid: string;
  pageTitle?: string;
}

export const upsertEntry = async ({
  source,
  revision,
  createdAt,
  message,
  pid,
  pageTitle,
}: Props) => {
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
};
