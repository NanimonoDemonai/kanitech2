import { Entry, EntryHistory } from "src/domains/Entry";
import { addEntry } from "src/infrastructures/database/entries/addEntry";
import { getEntry } from "src/infrastructures/database/entries/getEntry";
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

  public async save(history: EntryHistory): Promise<void> {
    await addEntry({
      ...history.entry,
      revision: history.revision,
      message: history.message,
    });
  }
}
