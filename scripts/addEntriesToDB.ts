import { getEntries } from "src/service/fs/getEntries";

const addEntriesToDB = async () => {
  const entries = await getEntries("entries");
};
