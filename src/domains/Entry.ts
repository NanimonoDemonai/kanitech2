export interface Entry {
  readonly pid: string;
  readonly pageTitle: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly source: string;
  readonly tags: string[];
}

export type EntryWithHistory = {
  readonly entry: Entry;
} & Omit<SourceHistory, "source">;

export interface SourceHistory {
  readonly revision: string;
  readonly message: string;
  readonly createdAt: Date;
  readonly source: string;
}
