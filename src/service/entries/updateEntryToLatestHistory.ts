import { prisma } from "src/service/prisma/client";

export const updateEntryToLatestHistory = async (pid: string) => {
  const latestHistory = await prisma.history.findFirst({
    where: { entryPid: pid },
    orderBy: { createdAt: "desc" },
  });

  if (!latestHistory) {
    throw new Error("history must exist");
  }

  await prisma.entry.update({
    where: { pid },
    data: {
      latestHistory: {
        upsert: {
          create: { revision: latestHistory.revision },
          update: { revision: latestHistory.revision },
        },
      },
    },
  });
};
