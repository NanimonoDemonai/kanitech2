import { inject, singleton } from "tsyringe";
import { EntryHistory } from "src/domains/Entry";

export interface EntryHistoryRepositoryInterface {
  findAll: () => Promise<EntryHistory[]>;
}

@singleton()
export class EntryHistoryUseCases {
  constructor(
    @inject("EntryHistoryRepository")
    private repository: EntryHistoryRepositoryInterface
  ) {}

  public async findAll() {
    return await this.repository.findAll();
  }
}
