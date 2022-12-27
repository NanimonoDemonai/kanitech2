import { EntryWithHistory, SourceHistory } from "src/domains/Entry";
import { getHistory } from "src/infrastructures/database/entries/getHistory";
import { EntryHistoryRepositoryInterface } from "src/useCases/EntryHistoryUseCases";

export class HistoryRepository implements EntryHistoryRepositoryInterface {
  async findAll(): Promise<EntryWithHistory[]> {
    // not implemented
    return [];
  }

  async findHistoryByPid(pid: string): Promise<SourceHistory[]> {
    const rawHistory = await getHistory(pid);

    return rawHistory.map((e) => ({
      revision: e.revision,
      message: e.message,
      createdAt: e.createdAt,
      source: e.source,
    }));
  }
}
