import { inject, singleton } from "tsyringe";
import { EntryWithHistory } from "src/domains/Entry";

export interface BatchHistoryRepositoryInterface {
  findAll: () => Promise<EntryWithHistory[]>;
}

@singleton()
export class BatchHistoryUseCases {
  constructor(
    @inject("BatchHistoryRepository")
    private repository: BatchHistoryRepositoryInterface
  ) {}

  public async findAll() {
    return await this.repository.findAll();
  }
}
