/*
 * @jest-environment node
 */

import { getHistory, showHistory } from "src/infrastructures/git/git";

describe("git", () => {
  it("should get log", async () => {
    expect(
      await getHistory("test_resource/how_to_mdx_bundling.mdx")
    ).toMatchSnapshot();
  });
  it("should show History", async () => {
    expect(
      await showHistory({
        hash: "fe4edc90e683cf9452d2ca6c9a330be19a661714",
        file: "test_resource/how_to_mdx_bundling.mdx",
      })
    ).toMatchSnapshot();
  });
  it("should not show History", async () => {
    expect(
      await showHistory({
        hash: "hogehogehoge",
        file: "test_resource/how_to_mdx_bundling.mdx",
      })
    ).toMatchSnapshot();
  });
});
