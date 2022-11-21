import { getEntry } from "src/service/entries/getEntry";
import { prisma } from "src/service/prisma/client";

describe("getEntry", () => {
  it("should getEntry", async () => {
    await prisma.entry.create({
      data: {
        pid: "aaa",
        source: "test",
        revision: "1",
      },
    });
    const entry = await getEntry("aaa");
    expect(entry).toMatchObject({
      pid: "aaa",
      source: "test",
      revision: "1",
    });
  });
});
