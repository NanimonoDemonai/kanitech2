import { inject, injectable, Lifecycle, scoped } from "tsyringe";
import { Entry } from "src/domains/Entry";
import { EntryPresenter } from "src/useCases/EntryUseCases";

export interface EntryPageViewModel extends Entry {
  renderedSource: string;
}

export interface EntryRenderer {
  render: (entry: Entry) => Promise<EntryPageViewModel["renderedSource"]>;
}

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class EntryPageStore implements EntryPresenter {
  public store: EntryPageViewModel | null = null;

  constructor(@inject("RenderEntry") private renderer: EntryRenderer) {
    console.log("created");
  }

  public async complete(entry: Entry) {
    const renderedSource = await this.renderer.render(entry);
    this.store = { ...entry, renderedSource };
    console.log(this.store === null);
  }

  public fail() {
    /* noop */
  }

  public select<T>(selector: (store: EntryPageViewModel) => T): T | null {
    console.log(this.store);

    if (!this.store) return null;

    return selector(this.store);
  }
}
