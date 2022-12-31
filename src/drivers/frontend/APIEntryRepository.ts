import { Entry } from "src/domains/Entry";
import { trpcClient } from "src/infrastructures/trpc/trpc";
import { EntryRepositoryInterface } from "src/useCases/EntryUseCases";

export class APIEntryRepository implements EntryRepositoryInterface {
  async find(pid: Entry["pid"]): Promise<Entry | null> {
    return trpcClient.entryByPid.query({ pid });
  }

  async findEntries(): Promise<Entry[] | null> {
    return Promise.resolve([]);
  }

  async save(): Promise<void> {
    return;
  }
}
