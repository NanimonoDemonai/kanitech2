import { NextPage } from "next";
import dynamic from "next/dynamic";

interface Props {
  pid: string;
}

const Index: NextPage<Props> = ({ pid }) => {
  const MDX = dynamic(() => import(`entries/${pid}.mdx`));
  return <MDX />;
};

export default Index;
