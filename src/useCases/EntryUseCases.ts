import { inject, injectable } from "tsyringe";
import { Entry } from "src/domains/Entry";

export interface EntryRepositoryInterface {
  save: (entry: Entry) => Promise<void>;
  find: (pid: Entry["pid"]) => Promise<Entry | null>;
}

@injectable()
export class EntryUseCases {
  constructor(
    @inject("EntryRepository") private repository: EntryRepositoryInterface
  ) {}

  public async save(entry: Entry) {
    await this.repository.save(entry);
  }

  public async find(pid: Entry["pid"]) {
    return await this.repository.find(pid);
  }
}
