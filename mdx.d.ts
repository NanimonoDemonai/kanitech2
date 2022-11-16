interface Frontmater{
    title: string;
    tags: string[];
}
declare module "*.mdx" {
    const Component: JSX;
    export const frontmatter: Frontmater;
    export default Component;
}