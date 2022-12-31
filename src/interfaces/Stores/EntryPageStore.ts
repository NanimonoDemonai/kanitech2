import { inject, Lifecycle, scoped } from "tsyringe";
import { Entry } from "src/domains/Entry";
import { AbstractStore } from "src/interfaces/Stores/AbstractStore";
import { EntryPresenter } from "src/useCases/interactores/EntryInteractors";

export interface EntryPageViewModel extends Entry {
  renderedSource: string;
}

export interface EntryRenderer {
  render: (entry: Entry) => Promise<EntryPageViewModel["renderedSource"]>;
}

@scoped(Lifecycle.ContainerScoped)
export class EntryPageStore
  extends AbstractStore<EntryPageViewModel>
  implements EntryPresenter
{
  constructor(@inject("RenderEntry") private renderer: EntryRenderer) {
    super();
  }

  public override async complete(entry: Entry) {
    const renderedSource = await this.renderer.render(entry);
    super.complete({ ...entry, renderedSource });
  }
}
