import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { addEntry } from "src/service/database/entries/addEntry";
import {
  getEntry,
  getEntryWithHistory,
} from "src/service/database/entries/getEntry";

describe("addEntry", () => {
  it("デフォルト値で作成できる", async () => {
    const pid = faker.lorem.slug();
    const source = faker.lorem.words();

    const data = { pid, source };
    await addEntry(data);
    const entry = await getEntry(data.pid);

    expect(entry).toMatchObject({
      pid,
      pageTitle: "",
    });
    expect(entry?.latestHistory?.history.source).toBe(source);
  });

  it("複数作っても新しいのだけ", async () => {
    const pid = faker.lorem.slug();
    const days = [dayjs(), dayjs().add(1, "day"), dayjs().subtract(4, "day")];
    const daysAndData = days.map((e) => ({
      pid,
      source: faker.lorem.words(),
      createdAt: e.toDate(),
    }));

    await addEntry(daysAndData[0]);
    expect(await getEntry(pid)).toMatchObject({
      pid,
    });
    expect((await getEntry(pid))?.latestHistory?.history).toMatchObject({
      source: daysAndData[0].source,
      createdAt: daysAndData[0].createdAt,
    });

    await addEntry(daysAndData[1]);
    expect(await getEntry(pid)).toMatchObject({
      pid,
    });
    expect((await getEntry(pid))?.latestHistory?.history).toMatchObject({
      source: daysAndData[1].source,
      createdAt: daysAndData[1].createdAt,
    });

    await addEntry(daysAndData[2]);
    expect(await getEntry(pid)).toMatchObject({
      pid,
    });
    expect((await getEntry(pid))?.latestHistory?.history).toMatchObject({
      source: daysAndData[1].source,
      createdAt: daysAndData[1].createdAt,
    });
  });

  it("履歴は3つある", async () => {
    const pid = faker.lorem.slug();
    const days = [dayjs(), dayjs().add(1, "day"), dayjs().subtract(4, "day")];
    const daysAndData = days.map((e) => ({
      day: e,
      data: {
        pid,
        source: faker.lorem.words(),
        createdAt: e.toDate(),
      },
    }));
    for (const e of daysAndData) {
      await addEntry(e.data);
    }

    const entry = await getEntryWithHistory(pid);
    if (!entry) {
      throw new Error("entry required");
    }
    for (const e of daysAndData) {
      expect(
        entry.history.some(
          (res) => res.source === e.data.source && e.day.isSame(res.createdAt)
        )
      ).toBeTruthy();
    }
  });
  it("タグがつけられる", async () => {
    const pid = faker.lorem.slug();

    const tags = [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()];
    const data = {
      pid,
      source: faker.lorem.words(),
      tags,
    };
    await addEntry(data);

    const entry = await getEntry(pid);
    expect(entry?.tags.map((e) => e.tagName)).toIncludeAllMembers(tags);
  });
});
