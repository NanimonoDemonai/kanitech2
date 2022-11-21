import { faker } from "@faker-js/faker";
import { addEntry } from "src/service/entries/addEntry";
import { getEntry } from "src/service/entries/getEntry";

describe("addEntry", function () {
  it("デフォルト値で作成できる", async () => {
    const data = { pid: faker.lorem.slug(), source: faker.lorem.lines() };
    await addEntry(data);
    const entry = await getEntry(data.pid);
    if (!entry) {
      throw new Error("entry must defined");
    }
    expect(entry.pid).toBe(data.pid);
    expect(entry.source).toBe(data.source);
    expect(entry.pageTitle).toBe("");
    expect(entry.revision).toBeDefined();
  });
});
