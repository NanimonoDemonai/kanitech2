import { getSessionContainer } from "src/di/container";
import { BatchHistoryUseCases } from "src/useCases/BatchHistoryUseCase";
import { EntryUseCases } from "src/useCases/EntryUseCases";

const addEntriesToDB = async () => {
  const container = getSessionContainer();
  const entryUseCase = container.resolve(EntryUseCases);
  const historyUseCase = container.resolve(BatchHistoryUseCases);
  const histories = await historyUseCase.findAll();
  await Promise.all(
    histories.map(async (entry) => {
      await entryUseCase.save(entry);
    })
  );
};

addEntriesToDB();
