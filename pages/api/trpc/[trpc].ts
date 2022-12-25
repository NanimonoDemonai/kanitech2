import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "src/drivers/AppRouter";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
