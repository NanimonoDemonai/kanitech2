import { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { getFrontendContainer } from "src/di/frontendContainer";
import { EntryHistoryUseCases } from "src/useCases/EntryHistoryUseCases";

const Index: NextPage = () => {
  useEffect(() => {
    const container = getFrontendContainer();
    const useCase = container.resolve(EntryHistoryUseCases);
    useCase.findHistoryByPid("how_to_mdx_bundling").then((e) => {
      console.log(e);
    });
  }, []);
  return (
    <div>
      <Link href="/entries">entries</Link>
    </div>
  );
};

export default Index;
