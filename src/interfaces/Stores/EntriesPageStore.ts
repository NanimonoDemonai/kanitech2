import { Lifecycle, scoped } from "tsyringe";
import { Entry } from "src/domains/Entry";
import { AbstractStore } from "src/interfaces/Stores/AbstractStore";
import { EntriesPresenter } from "src/useCases/interactores/EntryInteractors";

export type EntriesPageViewModel = Entry[];

@scoped(Lifecycle.ContainerScoped)
export class EntriesPageStore
  extends AbstractStore<EntriesPageViewModel>
  implements EntriesPresenter
{
}
