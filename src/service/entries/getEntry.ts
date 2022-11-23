import { prisma } from "src/service/prisma/client";

export const getEntry = (pid: string) =>
  prisma.entry.findUnique({ where: { pid }, include: { tags: true } });

export const getEntryWithHistory = (pid: string) =>
  prisma.entry.findUnique({
    where: { pid },
    include: { tags: true, history: true },
  });
