import { prisma } from "src/service/prisma/client";

export const getEntry = (pid: string) =>
  prisma.entry.findUnique({ where: { pid } });

export const getEntryWithHistory = (pid: string) =>
  prisma.entry.findUnique({ where: { pid }, include: { history: true } });
