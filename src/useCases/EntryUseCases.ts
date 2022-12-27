import { inject, singleton } from "tsyringe";
import { Entry, EntryWithHistory } from "src/domains/Entry";

export interface EntryRepositoryInterface {
  save: (entry: EntryWithHistory) => Promise<void>;
  find: (pid: Entry["pid"]) => Promise<Entry | null>;
  findEntries: () => Promise<Entry[] | null>;
}

@singleton()
export class EntryUseCases {
  constructor(
    @inject("EntryRepository") private repository: EntryRepositoryInterface
  ) {}

  public async save(history: EntryWithHistory) {
    await this.repository.save(history);
  }

  public async find(pid: Entry["pid"]) {
    return await this.repository.find(pid);
  }

  public async findEntries() {
    return await this.repository.findEntries();
  }
}
