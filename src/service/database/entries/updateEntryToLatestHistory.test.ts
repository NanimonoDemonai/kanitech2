import { randomUUID } from "crypto";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import "jest-extended";
import { getEntry } from "src/service/database/entries/getEntry";
import { updateEntryToLatestHistory } from "src/service/database/entries/updateEntryToLatestHistory";
import { prisma } from "src/service/database/prisma/client";

describe("addEntryToLatestHistory", () => {
  it("最新のhistoryになる", async () => {
    const pid = faker.lorem.slug();
    await prisma.entry.create({
      data: {
        pid,
      },
    });
    await prisma.history.create({
      data: {
        entryPid: pid,
        revision: randomUUID(),
        source: faker.lorem.words(),
        createdAt: dayjs().subtract(2, "days").toDate(),
      },
    });
    await prisma.history.create({
      data: {
        entryPid: pid,
        revision: randomUUID(),
        source: faker.lorem.words(),
        createdAt: dayjs().subtract(1, "days").toDate(),
      },
    });
    const latest = await prisma.history.create({
      data: {
        entryPid: pid,
        revision: randomUUID(),
        source: faker.lorem.words(),
        createdAt: dayjs().toDate(),
      },
    });
    await updateEntryToLatestHistory(pid);
    const entry = await getEntry(pid);
    if (!entry?.latestHistory?.history) {
      throw new Error("history must exist");
    }
    expect(entry.latestHistory.history).toMatchObject(latest);
  });
});
