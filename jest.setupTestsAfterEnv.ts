import { prisma } from "src/service/prisma/client";

beforeAll(async () => {
  await prisma.entry.deleteMany({});
});
