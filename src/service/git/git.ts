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

interface Param {
  file: string;
  hash: string;
}

/**
 * 記事のpidのgit historyを出す
 * @param file 記事のpid
 */
export const getHistory = async (file: string): Promise<readonly History[]> => {
  const log = await git.log<RawHistory>({
    file,
    format: {
      user: "%an",
      hash: "%H",
      message: "%s",
      date: "%ad",
    },
  });
  return log.all.map((e) => ({ ...e, date: new Date(e.date) }));
};

export const showHistory = async ({
  hash,
  file,
}: Param): Promise<
  | {
      success: true;
      data: string;
    }
  | { success: false; error: Error }
> => {
  try {
    const data = await git.show(`${hash}:${file}`);
    return { data, success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error, success: false };
    }
    return { error: new Error(`${hash}, ${file}`), success: false };
  }
};
