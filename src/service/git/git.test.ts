/*
 * @jest-environment node
 */
import {Git} from "src/service/git/git";

describe("git", () => {
  const git = new Git("test_resource");
  it("should get log", async () => {
    expect(await git.getHistory("how_to_mdx_bundling")).toMatchSnapshot();
  });
  it("should show History", async () => {
    expect(
        await git.showHistory({
          hash: "b1426f894423fff7b9cf679b566a1553508c15cd",
          entry: "how_to_mdx_bundling",
        })
    ).toMatchSnapshot();
  });
});
