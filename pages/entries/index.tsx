import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { Entry } from "src/domains/Entry";
import { getEntries } from "src/infrastructures/database/entries/getEntry";

interface Props {
  entries: Entry[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const entries: Entry[] = (await getEntries()).map((e) => ({
    ...e,
    tags: e.tags.map((e) => e.tagName),
    source: "",
  }));
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
    </div>
  );
};

export default Index;
