import { EntryWithHistory, SourceHistory } from "src/domains/Entry";
import { trpcClient } from "src/infrastructures/trpc/trpc";
import { EntryHistoryRepositoryInterface } from "src/useCases/EntryHistoryUseCases";

export class APIHistoryRepository implements EntryHistoryRepositoryInterface {
  findAll(): Promise<EntryWithHistory[]> {
    return Promise.resolve([]);
  }

  findHistoryByPid(pid: string): Promise<SourceHistory[]> {
    return trpcClient.historyByPid.query({ pid });
  }
}
