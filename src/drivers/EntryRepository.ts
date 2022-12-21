import { Entry } from "src/domains/Entry";
import { addEntry } from "src/infrastructures/database/entries/addEntry";
import { getEntry } from "src/infrastructures/database/entries/getEntry";
import { EntryRepositoryInterface } from "src/useCases/EntryUseCases";

export class EntryRepository implements EntryRepositoryInterface {
  public async find(pid: Entry["pid"]) {
    const rawEntry = await getEntry(pid);
    if (!rawEntry) return null;
    return {
      pid: rawEntry.pid,
      pageTitle: rawEntry.pageTitle,
      createdAt: rawEntry.createdAt,
      updatedAt: rawEntry.updatedAt,
      source: rawEntry.latestHistory?.history.source ?? "",
    };
  }

  public async save(entry: Entry): Promise<void> {
    await addEntry(entry);
  }
}
