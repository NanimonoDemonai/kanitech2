import { randomUUID } from "crypto";
import { addTags } from "src/service/database/entries/addTags";
import { updateEntryToLatestHistory } from "src/service/database/entries/updateEntryToLatestHistory";
import { upsertEntry } from "src/service/database/entries/upsertEntry";

interface Props {
  pid: string;
  pageTitle?: string;
  source: string;
  message?: string;
  revision?: string;
  createdAt?: Date;
  tags?: string[];
}

export const addEntry = async (props: Props) => {
  const now = new Date();
  const { pid, pageTitle, source, revision, createdAt, tags, message } = {
    ...props,
    createdAt: props.createdAt ?? now,
    revision: props.revision ?? randomUUID(),
  };

  await upsertEntry({ source, revision, createdAt, message, pid, pageTitle });
  await updateEntryToLatestHistory(pid);
  if (tags) {
    await addTags({ pid, tags });
  }
};
