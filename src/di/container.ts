import "reflect-metadata";
import { container, instancePerContainerCachingFactory } from "tsyringe";
import { MdxEntryRenderer } from "src/drivers/server/EntryRenderer";
import { EntryRepository } from "src/drivers/server/EntryRepository";
import { FileBaseEntryHistoryRepository } from "src/drivers/server/FileBaseEntryHistoryRepository";
import { HistoryRepository } from "src/drivers/server/HistoryRepository";
import { EntriesPageStore } from "src/interfaces/Stores/EntriesPageStore";
import { EntryPageStore } from "src/interfaces/Stores/EntryPageStore";
import { EntryUseCases } from "src/useCases/EntryUseCases";

container.register("EntryRepository", {
  useClass: EntryRepository,
});

container.register("EntryUseCases", {
  useClass: EntryUseCases,
});

container.register("EntryPresenter", {
  useFactory: instancePerContainerCachingFactory((c) =>
    c.resolve(EntryPageStore)
  ),
});

container.register("RenderEntry", {
  useClass: MdxEntryRenderer,
});

container.register("EntryHistoryRepository", {
  useClass: FileBaseEntryHistoryRepository,
});

container.register("EntriesListPresenter", {
  useFactory: instancePerContainerCachingFactory((c) =>
    c.resolve(EntriesPageStore)
  ),
});

container.register("EntryHistoryRepository", {
  useClass: HistoryRepository,
});

export const getContainer = () => container;
export const getSessionContainer = () => container.createChildContainer();
