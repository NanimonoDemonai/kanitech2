import { getHistory, showHistory } from "src/service/git/git";

describe("git", () => {
  it("should get log", async () => {
    expect(await getHistory("how_to_mdx_bundling")).toMatchSnapshot();
  });
  it("should show History", async () => {
    expect(
      await showHistory({
        hash: "b1426f894423fff7b9cf679b566a1553508c15cd",
        entry: "how_to_mdx_bundling",
      })
    ).toMatchSnapshot();
  });
});
