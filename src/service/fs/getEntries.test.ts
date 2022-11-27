/*
 * @jest-environment node
 */
import { getEntries } from "src/service/fs/getEntries";

describe("getEntries", () => {
  it("getEntries", async () => {
    const entries = await getEntries("test_resource");
    expect(entries).toIncludeAllMembers([
      "test_resource/how_to_mdx_bundling.mdx",
    ]);
  });
});
