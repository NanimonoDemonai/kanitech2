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

export interface EntryPresenter {
  complete: (entry: Entry) => Promise<void>;
  fail: () => Promise<void>;
}

@injectable()
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
