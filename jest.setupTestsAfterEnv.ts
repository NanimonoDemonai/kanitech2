import * as matchers from "jest-extended";
import { prisma } from "src/service/prisma/client";

expect.extend(matchers);
beforeAll(async () => {
  await prisma.entry.deleteMany({});
});
