import { addEntry } from "src/service/entries/addEntry";
import { getEntries } from "src/service/fs/getEntries";
import { getHistory, showHistory } from "src/service/git/git";
import { frontMatterParser } from "src/utils/parsers/FrontMatterParser";

const addEntriesToDB = async () => {
  const entriesFilename = await getEntries("entries");
  await Promise.all(
    entriesFilename.map(async ({ name, path }) => {
      const history = await getHistory(path);
      history.map(async (e) => {
        const { date, hash } = e;
        try {
          const source = await showHistory({ hash, file: path });
          const { frontMatter } = frontMatterParser(source);
          const entry = {
            createdAt: date,
            pageTitle: frontMatter.title,
            pid: name,
            revision: hash,
            source,
            tags: frontMatter.tags,
          };
          await addEntry(entry);
        } catch (e) {
          console.log(e);
        }
      });
    })
  );
};

addEntriesToDB();
