import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { addEntry } from "src/service/entries/addEntry";
import { getEntry, getEntryWithHistory } from "src/service/entries/getEntry";

describe("addEntry", () => {
  it("デフォルト値で作成できる", async () => {
    const data = { pid: faker.lorem.slug(), source: faker.lorem.lines() };
    await addEntry(data);
    const entry = await getEntry(data.pid);

    expect(entry).toMatchObject({
      ...data,
      pageTitle: "",
      revision: expect.any(String),
    });
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
    expect(await getEntry(daysAndData[0].pid)).toMatchObject(daysAndData[0]);

    await addEntry(daysAndData[1]);
    expect(await getEntry(daysAndData[1].pid)).toMatchObject(daysAndData[1]);

    await addEntry(daysAndData[2]);
    expect(await getEntry(daysAndData[2].pid)).toMatchObject(daysAndData[1]);
  });

  it("3回addすれば履歴は3つある", async () => {
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
  it("タグを作ればタグが追加される", async () => {
    const pid = faker.lorem.slug();
    const tags = [1, 2, 3].map((e) => faker.lorem.word());
    await addEntry({
      pid: pid,
      source: faker.lorem.words(),
      tags: tags,
    });
    const entry = await getEntry(pid);
    if (!entry) {
      throw new Error("entry must exist");
    }
    entry.tags[0].tag.name;
    expect(entry.tags).toBe(tags);
  });
});
