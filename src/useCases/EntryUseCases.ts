import { inject, singleton } from "tsyringe";
import { Entry, EntryHistory } from "src/domains/Entry";

export interface EntryRepositoryInterface {
  save: (entry: EntryHistory) => Promise<void>;
  find: (pid: Entry["pid"]) => Promise<Entry | null>;
  findEntries: () => Promise<Entry[] | null>;
}

@singleton()
export class EntryUseCases {
  constructor(
    @inject("EntryRepository") private repository: EntryRepositoryInterface
  ) {}

  public async save(history: EntryHistory) {
    await this.repository.save(history);
  }

  public async find(pid: Entry["pid"]) {
    return await this.repository.find(pid);
  }

  public async findEntries() {
    return await this.repository.findEntries();
  }
}
