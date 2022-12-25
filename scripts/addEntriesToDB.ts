import { container } from "src/di/container";
import { EntryHistory } from "src/domains/Entry";

import { getEntries } from "src/infrastructures/fs/getEntries";
import { getHistory, showHistory } from "src/infrastructures/git/git";
import { frontMatterParser } from "src/infrastructures/parsers/FrontMatterParser";
import { EntryUseCases } from "src/useCases/EntryUseCases";

const addEntriesToDB = async () => {
  const entriesFilename = await getEntries("entries");
  await Promise.all(
    entriesFilename.map(async ({ name, path }) => {
      const history = await getHistory(path);

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
          const useCase = container.resolve(EntryUseCases);
          await useCase.save(entry);
        } catch (e) {
          console.log(e);
        }
      });
    })
  );
};

addEntriesToDB();
