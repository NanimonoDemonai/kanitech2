import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { getSessionContainer } from "src/di/container";
import { Entry } from "src/domains/Entry";
import { EntriesPageStore } from "src/interfaces/Stores/EntriesPageStore";
import { EntriesInteractor } from "src/useCases/interactores/EntryInteractors";

interface Props {
  entries: Entry[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const container = getSessionContainer();
  const entriesInteractor = container.resolve(EntriesInteractor);
  const store = container.resolve(EntriesPageStore);
  await entriesInteractor.handleFindEntries();
  const entries = store.store;
  if (!entries) return { notFound: true };
  return {
    props: {
      entries,
    },
    revalidate: 10,
  };
};

const Index: NextPage<Props> = ({ entries }) => {
  return (
    <div>
      {entries.map((e) => (
        <p key={e.pid}>
          <Link href={`/entries/${e.pid}`}>{e.pageTitle}</Link>
        </p>
      ))}
      {JSON.stringify(entries)}
    </div>
  );
};

export default Index;
