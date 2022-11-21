import { randomUUID } from "crypto";
import { prisma } from "src/service/prisma/client";

interface Props {
  pid: string;
  pageTitle?: string;
  source: string;
  revision?: string;
  createdAt?: Date;
}

export const addEntry = async (props: Props) => {
  const now = new Date();
  const entryData = {
    ...props,
    createdAt: props.createdAt ?? now,
    revision: props.revision ?? randomUUID(),
  };
  const history = {
    source: entryData.source,
    revision: entryData.revision,
    createdAt: props.createdAt ?? now,
  };
  await prisma.$transaction([
    prisma.entry.upsert({
      where: {
        pid: entryData.pid,
      },
      create: {
        ...entryData,
        history: {
          create: {
            ...history,
          },
        },
      },
      update: {
        history: {
          connectOrCreate: {
            where: { revision: entryData.revision },
            create: {
              ...history,
            },
          },
        },
      },
    }),
    prisma.entry.updateMany({
      where: {
        pid: entryData.pid,
        createdAt: {
          lt: now,
        },
      },
      data: { ...entryData },
    }),
  ]);
};
