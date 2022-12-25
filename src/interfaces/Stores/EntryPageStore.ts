import { inject, Lifecycle, scoped } from "tsyringe";
import { Entry } from "src/domains/Entry";
import { EntryPresenter } from "src/useCases/EntryUseCases";

export interface EntryPageViewModel extends Entry {
  renderedSource: string;
}

export interface EntryRenderer {
  render: (entry: Entry) => Promise<EntryPageViewModel["renderedSource"]>;
}

@scoped(Lifecycle.ContainerScoped)
export class EntryPageStore implements EntryPresenter {
  public store: EntryPageViewModel | null = null;

  constructor(@inject("RenderEntry") private renderer: EntryRenderer) {}

  public async complete(entry: Entry) {
    const renderedSource = await this.renderer.render(entry);
    this.store = { ...entry, renderedSource };
  }

  public async fail() {
    /* noop */
  }

  public select<T>(selector: (store: EntryPageViewModel) => T): T | null {
    if (!this.store) return null;
    return selector(this.store);
  }
}
