import { simpleGit } from "simple-git";

const git = simpleGit();
git.init();

interface RawHistory {
  user: string;
  hash: string;
  message: string;
  date: string;
}

export interface History {
  user: string;
  hash: string;
  message: string;
  date: Date;
}

/**
 * 記事のpidのgit historyを出す
 * @param entry 記事のpid
 */
export const getHistory = async (
  entry: string
): Promise<readonly History[]> => {
  const log = await git.log<RawHistory>({
    file: `entries/${entry}.mdx`,
    format: {
      user: "%an",
      hash: "%H",
      message: "%s",
      date: "%ad",
    },
  });
  return log.all.map((e) => ({ ...e, date: new Date(e.date) }));
};

interface Param {
  entry: string;
  hash: string;
}

export const showHistory = async ({ hash, entry }: Param): Promise<string> =>
  git.show(`${hash}:entries/${entry}.mdx`);
