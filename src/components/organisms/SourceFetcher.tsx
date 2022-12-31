import { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import { sourceAtom } from "src/interfaces/atoms/sourceAtom";

const SourceFetcherInternal: FC<{ pid: string }> = ({ pid }) => {
  const source = useRecoilValue(sourceAtom(pid));
  return (
    <div>
      <code>{source}</code>
    </div>
  );
};

export const SourceFetcher: FC<{ pid: string }> = ({ pid }) => {
  return (
    <Suspense
      fallback={
        <div>
          <p>loading..</p>
        </div>
      }
    >
      <SourceFetcherInternal pid={pid} />
    </Suspense>
  );
};
