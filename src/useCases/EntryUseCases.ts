import { inject, singleton } from "tsyringe";
import { Entry, EntryHistory } from "src/domains/Entry";

export interface EntryRepositoryInterface {
  save: (entry: EntryHistory) => Promise<void>;
  find: (pid: Entry["pid"]) => Promise<Entry | null>;
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
}

export interface EntryPresenter {
  complete: (entry: Entry) => Promise<void>;
  fail: () => Promise<void>;
}

@singleton()
export class EntryInteractor {
  constructor(
    @inject("EntryPresenter") private presenter: EntryPresenter,
    @inject("EntryUseCases") private useCases: EntryUseCases
  ) {}

  public async handleGet(pid: string) {
    const entry = await this.useCases.find(pid);
    if (!entry) {
      await this.presenter.fail();
      return;
    }
    await this.presenter.complete(entry);
  }
}
