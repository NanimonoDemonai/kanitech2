import { MDXProvider } from "@mdx-js/react";
import { getMDXComponent } from "mdx-bundler/client";
import { FC, useMemo } from "react";

export const MDXViewer: FC<{ code: string }> = ({ code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <MDXProvider>
      <Component />
    </MDXProvider>
  );
};
