import { faker } from "@faker-js/faker";
import "jest-extended";
import { addEntry } from "src/service/entries/addEntry";
import { addTags } from "src/service/entries/addTags";
import { getEntry } from "src/service/entries/getEntry";

describe("addTags", () => {
  it("タグがつけられる", async () => {
    const pid = faker.lorem.slug();
    const tags = [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()];
    await addEntry({
      pid,
      source: faker.lorem.words(),
    });
    await addTags({ pid, tags });

    const entry = await getEntry(pid);
    if (!entry) {
      throw new Error("entry must exist");
    }

    expect(entry.tags.map((e) => e.tagName)).toIncludeAllMembers(tags);
  });
});
