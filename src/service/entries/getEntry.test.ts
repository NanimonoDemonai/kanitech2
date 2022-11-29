import { addEntry } from "src/service/entries/addEntry";
import { getEntry } from "src/service/entries/getEntry";

describe("getEntry", () => {
  it("should getEntry", async () => {
    await addEntry({
      pageTitle: "イカ",
      pid: "ika",
      revision: "ikaika",
      source: "イカは美味しい",
      tags: ["海産物"],
    });
    const entry = await getEntry("ika");
    console.log(entry);
    expect(entry).toMatchObject({
      pid: "ika",
      pageTitle: "イカ",
      source: "test",
      revision: "1",
    });
  });
});
