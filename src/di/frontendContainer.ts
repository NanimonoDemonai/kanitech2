import "reflect-metadata";
import { container } from "tsyringe";
import { APIHistoryRepository } from "src/drivers/frontend/APIHistoryRepository";

container.register("EntryHistoryRepository", {
  useClass: APIHistoryRepository,
});

export const getFrontendContainer = () => container.createChildContainer();
