import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { getContainer } from "src/di/container";
import { EntryHistoryUseCases } from "src/useCases/EntryHistoryUseCases";

const t = initTRPC.create({
  transformer: superjson,
});
const container = getContainer();
const historyRepository = container.resolve(EntryHistoryUseCases);
export const appRouter = t.router({
  historyByPid: t.procedure
    .input(z.object({ pid: z.string() }))
    .query((req) => {
      const {
        input: { pid },
      } = req;
      const histories = historyRepository.findHistoryByPid(pid);
      return histories;
    }),
});
export const router = t.router;
export const procedure = t.procedure;
