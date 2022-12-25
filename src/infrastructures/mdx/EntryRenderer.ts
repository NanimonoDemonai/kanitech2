import { Entry } from "src/domains/Entry";
import { compileMdx } from "src/infrastructures/mdx/compileMdx";
import { EntryRenderer } from "src/interfaces/Stores/EntryPageStore";

export class MdxEntryRenderer implements EntryRenderer {
  public async render(entry: Entry) {
    const mdx = await compileMdx(entry.source);
    return mdx.code;
  }
}
