import { inject, singleton } from "tsyringe";
import { SourceHistory } from "src/domains/Entry";

export interface EntryHistoryRepositoryInterface {
  findHistoryByPid: (pid: string) => Promise<SourceHistory[]>;
}

@singleton()
export class EntryHistoryUseCases {
  constructor(
    @inject("EntryHistoryRepository")
    private repository: EntryHistoryRepositoryInterface
  ) {}

  public async findHistoryByPid(pid: string) {
    return await this.repository.findHistoryByPid(pid);
  }
}
