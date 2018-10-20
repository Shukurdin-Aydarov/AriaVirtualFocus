export class Queue<T> {
  private _items: T[] = [];

  get count() {
    return this._items.length;
  }

  push(value: T) {
    this._items.push(value);
  }

  pop(): T | undefined {
    return this._items.shift();
  }
}
