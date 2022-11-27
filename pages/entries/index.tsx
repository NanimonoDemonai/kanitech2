import { GetStaticPaths, GetStaticProps, NextPage } from "next";
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

const Index: NextPage<Props> = ({ entries }) => {
  return (
    <div>
      {entries.map((e) => (
        <p key={e.pid}>{e.pageTitle}</p>
      ))}
    </div>
  );
};

export default Index;
