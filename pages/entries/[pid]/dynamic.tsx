import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import {unknownParamsToPIDParams} from "src/utils/validators/unknownParamsToPIDParams";
import {frontMatterParser} from "src/utils/parsers/FrontMatterParser";

interface Props {
  title: string;
  pid: string;
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const pid = unknownParamsToPIDParams(params);
  if (!pid) return { notFound: true };
  const { default: src } = await import(`entries/${pid}.mdx?raw`);
  const { frontMatter, content } = frontMatterParser(src);

  return {
    props: {
      title: frontMatter.title,
      pid,
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

const Index: NextPage<Props> = ({ pid }) => {
  const MDX = dynamic(() => import(`entries/${pid}.mdx`));
  return <MDX />;
};

export default Index;
