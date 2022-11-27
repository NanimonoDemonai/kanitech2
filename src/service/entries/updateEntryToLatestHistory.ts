import { prisma } from "src/service/prisma/client";

export const updateEntryToLatestHistory = async (entryId: number) => {
  const latestHistory = await prisma.history.findFirst({
    where: { entryId },
    orderBy: { createdAt: "desc" },
  });

  if (!latestHistory) {
    throw new Error("history must exist");
  }

  await prisma.entry.update({
    where: { id: entryId },
    data: {
      latestHistory: {
        upsert: {
          create: { historyId: latestHistory.id },
          update: { historyId: latestHistory.id },
        },
      },
    },
  });
};
