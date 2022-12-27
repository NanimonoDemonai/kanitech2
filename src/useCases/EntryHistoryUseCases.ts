import { inject, singleton } from "tsyringe";
import { EntryWithHistory, SourceHistory } from "src/domains/Entry";

export interface EntryHistoryRepositoryInterface {
  findAll: () => Promise<EntryWithHistory[]>;
  findHistoryByPid: (pid: string) => Promise<SourceHistory[]>;
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

  public async findHistoryByPid(pid: string) {
    return await this.repository.findHistoryByPid(pid);
  }
}
