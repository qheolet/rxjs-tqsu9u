import { of, Observable, BehaviorSubject } from "rxjs";

interface Options {
  id: string;
}

export class Collection<T> {
  private _list: BehaviorSubject<Array<T>> = new BehaviorSubject([]);
  private _id: string;

  constructor(item: Array<T>, options?: Options) {
    if (options) {
      this._id = options.id;
    }

    this.set(item);
  }

  add(item: T): number {
    const r = this.snapshot;
    r.push(item);
    this._list.next(r);
    return this.snapshot.length;
  }

  getItemByIndex(idx: number): T {
    return this.snapshot[0];
  }

  set(item: Array<T>): number {
    this._list.next(this.snapshot.concat(item));
    return this.snapshot.length;
  }

  getById(id: string) {
    if (!this._id) {
      throw new Error("Need to set the id attr");
    }
    const r = this.snapshot;
    const find = r.filter(e => {
      return e[this._id] === id;
    });

    return find.length ? find[0] : undefined;
  }

  query(fn: (a: T, b: T) => number): T[] {
    return this.snapshot.sort(fn);
  }

  indexBy(fn: Function, init = {}): { [key: string]: T[] } {
    const r = init;
    const list = this.snapshot;

    list.forEach(item => {
      if (r.hasOwnProperty(fn(item))) {
        r[fn(item)].push(item);
      } else {
        r[fn(item)] = [item];
      }
    });

    return r;
  }

  getObservable() {
    return this._list;
  }

  get size() {
    return this.snapshot.length;
  }

  get snapshot() {
    return this._list.getValue();
  }
}
export class Model {
  has(attr: string) {
    return this.hasOwnProperty(attr);
  }

  get(attr: string): Error | any {
    if (!this.has(attr)) {
      throw new Error("Attribute does not available");
    }
    return this[attr];
  }

  beforeSet() {}
  afterSet() {}
}
