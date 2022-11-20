import { getEntry } from "src/service/entries/getEntry";
import { prisma } from "src/service/prisma/client";

describe("getEntry", function () {
  beforeAll(async () => {
    await prisma.entry.deleteMany({});

    await prisma.entry.create({
      data: {
        pid: "aaa",
        source: "test",
        revision: 1,
      },
    });
  });
  it("should getEtnry", async function () {
    const entry = await getEntry("aaa");
    expect(entry).toMatchObject({
      pid: "aaa",
      source: "test",
      revision: 1,
    });
  });
});
