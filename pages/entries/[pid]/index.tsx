import { MDXProvider } from "@mdx-js/react";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useMemo } from "react";
import { getSessionContainer } from "src/di/container";
import { EntryPageStore } from "src/interfaces/Stores/EntryPageStore";
import { EntryInteractor } from "src/useCases/interactores/EntryInteractors";
import { unknownParamsToPIDParams } from "src/utils/validators/unknownParamsToPIDParams";

interface Props {
  code: string;
  title: string;
  pid: string;
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const pid = unknownParamsToPIDParams(params);
  if (!pid) return { notFound: true };
  const container = getSessionContainer();
  const interactor = container.resolve(EntryInteractor);
  const store = container.resolve(EntryPageStore);
  await interactor.handleGet(pid);
  const select = store.select((s) => ({
    code: s.renderedSource,
    title: s.pageTitle,
  }));
  if (!select) return { notFound: true };
  const { code, title } = select;
  return {
    props: {
      code,
      title,
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
