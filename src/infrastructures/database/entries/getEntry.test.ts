import { addEntry } from "src/infrastructures/database/entries/addEntry";
import { getEntry } from "src/infrastructures/database/entries/getEntry";

describe("getEntry", () => {
  it("should getEntry", async () => {
    await addEntry({
      pageTitle: "イカ",
      pid: "ika",
      revision: "ikaika",
      source: "イカは美味しい",
      tags: ["海産物", "頭足類"],
    });
    const entry = await getEntry("ika");
    expect(entry).toMatchObject({
      pid: "ika",
      pageTitle: "イカ",
    });
    expect(entry?.latestHistory?.history).toMatchObject({
      entryPid: "ika",
      source: "イカは美味しい",
      revision: "ikaika",
    });
    expect(entry?.tags.map((e) => e.tagName)).toIncludeAllMembers([
      "海産物",
      "頭足類",
    ]);
  });
});
