/*
 * @jest-environment node
 */
import { getEntries } from "src/infrastructures/fs/getEntries";

describe("getEntries", () => {
  it("getEntries", async () => {
    const entries = await getEntries("test_resource");
    expect(entries).toIncludeAllMembers([
      {
        name: "how_to_mdx_bundling",
        path: "test_resource/how_to_mdx_bundling.mdx",
      },
    ]);
  });
});
