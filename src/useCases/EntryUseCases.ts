import { inject, injectable } from "tsyringe";
import { Entry } from "src/domains/Entry";

export interface EntryRepository {
  save: (entry: Entry) => Promise<void>;
}

@injectable()
export class EntryUseCases {
  constructor(@inject("EntryRepository") private repository: EntryRepository) {}

  public async save(entry: Entry) {
    await this.repository.save(entry);
  }
}
