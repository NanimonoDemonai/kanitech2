import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const appRouter = t.router({
  userById: t.procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((req) => {
      const {
        input: { text },
      } = req;
      return `hello ${text}`;
    }),
});
export const router = t.router;
export const procedure = t.procedure;
