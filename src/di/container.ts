import "reflect-metadata";
import { container, instancePerContainerCachingFactory } from "tsyringe";
import { EntryRepository } from "src/infrastructures/drivers/EntryRepository";
import { MdxEntryRenderer } from "src/infrastructures/mdx/EntryRenderer";
import { EntryPageStore } from "src/Stores/EntryPageStore";
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

export { container };
