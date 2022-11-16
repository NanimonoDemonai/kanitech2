import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";

const Mdx = dynamic(() => import("../../entries/lorem.mdx"));

interface Props {
  date: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      date: JSON.stringify(new Date()),
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

const Id: NextPage<Props> = ({date}) => (
  <MDXProvider>
    {date}
    <Mdx />
  </MDXProvider>
);

export default Id;
