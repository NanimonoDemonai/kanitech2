import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { getContainer } from "src/di/container";
import { EntryHistoryUseCases } from "src/useCases/EntryHistoryUseCases";
import { EntryUseCases } from "src/useCases/EntryUseCases";
import { pidSchema } from "src/utils/validators/unknownParamsToPIDParams";

const t = initTRPC.create({
  transformer: superjson,
});
const container = getContainer();
const historyUseCases = container.resolve(EntryHistoryUseCases);
const entryUseCases = container.resolve(EntryUseCases);

export const appRouter = t.router({
  historyByPid: t.procedure.input(pidSchema).query((req) => {
    return historyUseCases.findHistoryByPid(req.input.pid);
  }),
  entryByPid: t.procedure.input(pidSchema).query((req) => {
    return entryUseCases.find(req.input.pid);
  }),
});
export const router = t.router;
export const procedure = t.procedure;
