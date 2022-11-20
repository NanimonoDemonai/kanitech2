import { simpleGit } from "simple-git";

const git = simpleGit();
describe("git", () => {
  it("should get log", async () => {
    git.init();
    const log = await git.log({
      file: "entries/how_to_mdx_bundling.mdx",
      format: "fuller",
    });
    expect(log).toMatchSnapshot();

    const data = await git.show(
      "b1426f894423fff7b9cf679b566a1553508c15cd:entries/how_to_mdx_bundling.mdx"
    );
    expect(data).toMatchSnapshot();
  });
});
