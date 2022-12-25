import { inject, singleton } from "tsyringe";
import { Entry } from "src/domains/Entry";
import { EntryUseCases } from "src/useCases/EntryUseCases";

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

export interface EntriesPresenter {
  complete: (entries: Entry[]) => Promise<void>;
  fail: () => Promise<void>;
}

@singleton()
export class EntriesInteractor {
  constructor(
    @inject("EntriesListPresenter") private presenter: EntriesPresenter,
    @inject("EntryUseCases") private useCases: EntryUseCases
  ) {}

  public async handleFindEntries() {
    const entries = await this.useCases.findEntries();
    if (!entries) {
      await this.presenter.fail();
      return;
    }
    await this.presenter.complete(entries);
  }
}
