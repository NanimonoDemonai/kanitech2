import { getSessionContainer } from "src/di/container";
import { EntryHistoryUseCases } from "src/useCases/EntryHistoryUseCases";
import { EntryUseCases } from "src/useCases/EntryUseCases";

const addEntriesToDB = async () => {
  const container = getSessionContainer();
  const entryUseCase = container.resolve(EntryUseCases);
  const historyUseCase = container.resolve(EntryHistoryUseCases);
  const histories = await historyUseCase.findAll();
  await Promise.all(
    histories.map(async (entry) => {
      await entryUseCase.save(entry);
    })
  );
};

addEntriesToDB();
