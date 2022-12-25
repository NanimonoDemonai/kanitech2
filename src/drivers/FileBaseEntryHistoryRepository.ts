import { EntryHistory } from "src/domains/Entry";
import { getEntries } from "src/infrastructures/fs/getEntries";
import { getHistory, showHistory } from "src/infrastructures/git/git";
import { frontMatterParser } from "src/infrastructures/parsers/FrontMatterParser";
import { EntryHistoryRepositoryInterface } from "src/useCases/EntryHistoryUseCases";

export class FileBaseEntryHistoryRepository
  implements EntryHistoryRepositoryInterface
{
  public async findAll() {
    const entryHistories: EntryHistory[] = [];
    const entriesFilename = await getEntries("entries");
    await Promise.all(
      entriesFilename.map(async ({ name, path }) => {
        const history = await getHistory(path);
        await Promise.all(
          history.map(async (e) => {
            const { date, hash, message } = e;
            try {
              const res = await showHistory({ hash, file: path });
              if (!res.success) {
                return;
              }
              const source = res.data;
              const { frontMatter } = frontMatterParser(source);
              const entry: EntryHistory = {
                entry: {
                  createdAt: date,
                  pageTitle: frontMatter.title,
                  pid: name,
                  source,
                  updatedAt: date,
                  tags: frontMatter.tags,
                },
                createdAt: date,
                revision: hash,
                message,
              };
              entryHistories.push(entry);
            } catch (e) {
              console.log(e);
            }
          })
        );
      })
    );
    return entryHistories;
  }
}
