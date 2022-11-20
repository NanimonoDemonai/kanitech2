import { prisma } from "src/service/prisma/client";

export const getEntry = (pid: string) =>
  prisma.entry.findUnique({ where: { pid } });
