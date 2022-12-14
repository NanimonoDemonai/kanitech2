import { Entry, EntryWithHistory } from "src/domains/Entry";
import { addEntry } from "src/infrastructures/database/entries/addEntry";
import {
  getEntries,
  getEntry,
} from "src/infrastructures/database/entries/getEntry";
import { EntryRepositoryInterface } from "src/useCases/EntryUseCases";

export class EntryRepository implements EntryRepositoryInterface {
  public async find(pid: Entry["pid"]) {
    const rawEntry = await getEntry(pid);
    if (!rawEntry) return null;
    const entry: Entry = {
      pid: rawEntry.pid,
      pageTitle: rawEntry.pageTitle,
      createdAt: rawEntry.createdAt,
      updatedAt: rawEntry.updatedAt,
      tags: rawEntry.tags.map((e) => e.tagName),
      source: rawEntry.latestHistory?.history.source ?? "",
    };
    return entry;
  }

  public async save(history: EntryWithHistory): Promise<void> {
    await addEntry({
      ...history,
    });
  }

  public async findEntries() {
    const rawEntries = await getEntries();
    if (!rawEntries) return null;
    return rawEntries.map(
      (rawEntry): Entry => ({
        pid: rawEntry.pid,
        pageTitle: rawEntry.pageTitle,
        createdAt: rawEntry.createdAt,
        updatedAt: rawEntry.updatedAt,
        tags: rawEntry.tags.map((e) => e.tagName),
        source: "",
      })
    );
  }
}
