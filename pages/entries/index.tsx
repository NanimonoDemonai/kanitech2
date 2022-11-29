import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { getEntries } from "src/service/entries/getEntry";
import { Entry } from "src/types/Entry";

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
