import "reflect-metadata";
import { container } from "tsyringe";
import { APIEntryRepository } from "src/drivers/frontend/APIEntryRepository";
import { APIHistoryRepository } from "src/drivers/frontend/APIHistoryRepository";

container.register("EntryHistoryRepository", {
  useClass: APIHistoryRepository,
});

container.register("EntryRepository", {
  useClass: APIEntryRepository,
});

export const getFrontendContainer = () => container.createChildContainer();
