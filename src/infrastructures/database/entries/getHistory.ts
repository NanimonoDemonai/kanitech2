import { prisma } from "src/infrastructures/database/prisma/client";

export const getHistory = async (pid: string) =>
  prisma.history.findMany({ where: { entryPid: pid } });
