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
    const today = dayjs();
    const tomorrow = dayjs().add(1, "day");
    const yesterday = dayjs().subtract(4, "day");
    const pid = faker.lorem.slug();

    const data1 = {
      pid,
      source: faker.lorem.lines(),
      createdAt: today.toDate(),
    };
    const data2 = {
      pid,
      source: faker.lorem.lines(),
      createdAt: tomorrow.toDate(),
    };
    const data3 = {
      pid,
      source: faker.lorem.lines(),
      createdAt: yesterday.toDate(),
    };
    await addEntry(data1);
    const entry = await getEntry(data1.pid);
    expect(entry).toMatchObject({
      ...data1,
    });

    await addEntry(data2);
    const entry2 = await getEntry(data1.pid);
    expect(entry2).toMatchObject({
      ...data2,
    });

    await addEntry(data3);
    const entry3 = await getEntry(data1.pid);
    expect(entry3).toMatchObject({
      ...data2,
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
});
