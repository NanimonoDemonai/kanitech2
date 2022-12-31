import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Suspense, useCallback, useState } from "react";
import { MDXViewer } from "src/components/organisms/MDXViewer";
import { SourceFetcher } from "src/components/organisms/SourceFetcher";
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
  const select = store.store;
  if (!select) return { notFound: true };
  const { renderedSource, pageTitle } = select;
  return {
    props: {
      code: renderedSource,
      title: pageTitle,
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

const Index: NextPage<Props> = ({ code, pid }) => {
  const [show, setShow] = useState(false);
  const onClick = useCallback(() => {
    setShow(!show);
  }, [show]);
  return (
    <div>
      {show ? (
        <Suspense fallback={<p>loading</p>}>
          <SourceFetcher pid={pid} />
        </Suspense>
      ) : (
        <div>
          <p>出てない</p>
        </div>
      )}
      <button type={"button"} onClick={onClick}>
        出す
      </button>
      <MDXViewer code={code} />
    </div>
  );
};

export default Index;
