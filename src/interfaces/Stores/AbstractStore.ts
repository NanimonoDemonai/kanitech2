export abstract class AbstractStore<VM> {
  protected store: VM | null = null;

  public select<T>(selector: (store: VM) => T): T | null {
    if (!this.store) return null;
    return selector(this.store);
  }
}
