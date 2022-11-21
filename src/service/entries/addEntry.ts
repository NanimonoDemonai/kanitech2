import { randomUUID } from "crypto";
import { prisma } from "src/service/prisma/client";

interface Props {
  pid: string;
  pageTitle?: string;
  source: string;
  revision?: string;
}

export const addEntry = async (props: Props) => {
  await prisma.entry.create({
    data: { ...props, revision: props.revision ?? randomUUID() },
  });
};
