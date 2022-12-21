import { container } from "tsyringe";
import { EntryRepository } from "src/drivers/EntryRepository";

container.register("EntryRepository", {
  useClass: EntryRepository,
});

export { container };
