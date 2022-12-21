import { addEntry } from "src/service/database/entries/addEntry";
import { getEntries } from "src/service/fs/getEntries";
import { getHistory, showHistory } from "src/service/git/git";
import { frontMatterParser } from "src/utils/parsers/FrontMatterParser";

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
          const entry = {
            createdAt: date,
            pageTitle: frontMatter.title,
            pid: name,
            revision: hash,
            source,
            message,
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
