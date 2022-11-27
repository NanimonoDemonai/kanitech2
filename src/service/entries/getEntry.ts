import { prisma } from "src/service/prisma/client";

export const getEntry = (pid: string) =>
  prisma.entry.findUnique({
    where: { pid },
    include: {
      tags: true,
      latestHistory: {
        include: {
          history: true,
        },
      },
    },
  });

export const getEntryWithHistory = (pid: string) =>
  prisma.entry.findUnique({
    where: { pid },
    include: { tags: true, history: true },
  });

export const getEntries = () =>
  prisma.entry.findMany({ include: { tags: true } });
