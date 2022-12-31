export abstract class AbstractStore<VM> {
  protected _store: VM | null = null;

  public get store() {
    return this._store;
  }

  public async complete(store: VM) {
    this._store = store;
  }

  public async fail() {
    /* noop */
  }
}
