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
  entry: string;
  hash: string;
}

export class Git {
  constructor(private path: string) {}

  /**
   * 記事のpidのgit historyを出す
   * @param entry 記事のpid
   */
  public getHistory = async (entry: string): Promise<readonly History[]> => {
    const log = await git.log<RawHistory>({
      file: `${this.path}/${entry}.mdx`,
      format: {
        user: "%an",
        hash: "%H",
        message: "%s",
        date: "%ad",
      },
    });
    return log.all.map((e) => ({ ...e, date: new Date(e.date) }));
  };

  public showHistory = async ({ hash, entry }: Param): Promise<string> =>
    git.show(`${hash}:${this.path}/${entry}.mdx`);
}
