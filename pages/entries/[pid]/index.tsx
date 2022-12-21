import { MDXProvider } from "@mdx-js/react";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useMemo } from "react";
import { compileMdx } from "src/infrastructures/mdx/compileMdx";
import { frontMatterParser } from "src/utils/parsers/FrontMatterParser";
import { unknownParamsToPIDParams } from "src/utils/validators/unknownParamsToPIDParams";

interface Props {
  code: string;
  title: string;
  pid: string;
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const pid = unknownParamsToPIDParams(params);
  if (!pid) return { notFound: true };
  const { default: src } = await import(`entries/${pid}.mdx?raw`);
  const { frontMatter, content } = frontMatterParser(src);
  const { code } = await compileMdx(content);
  return {
    props: {
      code,
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

const Index: NextPage<Props> = ({ code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <MDXProvider>
      <Component />
    </MDXProvider>
  );
};

export default Index;
