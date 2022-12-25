import { NextPage } from "next";
import Link from "next/link";
import { trpc } from "src/infrastructures/trpc/trpc";

const Index: NextPage = () => {
  const hello = trpc.userById.useQuery({ text: "client" });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Link href="/entries">entries</Link>
      <p>{hello.data}</p>
    </div>
  );
};

export default Index;
